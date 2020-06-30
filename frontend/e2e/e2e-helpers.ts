import { browser, by, element, protractor } from 'protractor';

function getMetricRowByInterfaceName(rows, interfaceName: string) {
  let metricRow = rows.filter((row) => {
    let interfaceNameCell = row.element(by.className('interface-name'));
    return interfaceNameCell.getText().then(text => text === interfaceName);
  });
  return metricRow;
}

export function getMetricCountFor(interfaceName: string, metricHeader: string) {
  let rows = element.all(by.className('metrics-row'));
  let metricRow = getMetricRowByInterfaceName(rows, interfaceName);
  let completionCountFromRow = getMetricCountFromRow(metricRow, metricHeader);
  return completionCountFromRow;
}

async function getMetricCountFromRow(metricRow, metricHeader: string) {
  let cellText = '0';
  let rowCount = await metricRow.count().then(count => {
    return count;
  });
  if (rowCount > 0) {
    cellText = await metricRow.get(0)
      .element(by.className(metricHeader))
      .getText()
      .then((text) => {
        return text;
      });
  }
  return Number.parseInt(cellText);
}

export function takeQuiz() {
  element(by.className('button-quiz')).click();
  element(by.css('[aria-label="fox"]')).click();
  element(by.css('[aria-label="Augusta"]')).click();
  element(by.className('sv_complete_btn')).click();
}

function testMetrics(
  metricType: string,
  metricCountStart: number[],
  metricCountEnd: number[],
  primaryInterface: string,
  secondaryInterface1: string,
  secondaryInterface2: string
) {
  expect(metricCountEnd[0]).toBe(
    metricCountStart[0] + 1,
    `Metrics did not a ${metricType} for ${primaryInterface}`
  );

  expect(metricCountEnd[1]).toBe(
    metricCountEnd[1],
    `Metrics erroneously added a ${metricType} to ${secondaryInterface1}`
  );

  expect(metricCountEnd[2]).toBe(
    metricCountEnd[2],
    `Metrics erroneously added a ${metricType} to ${secondaryInterface2}`
  );
}

export async function journeyReadAndQuiz(
  primaryInterface: string,
  secondaryInterface1: string,
  secondaryInterface2: string,
) {
  const completionCountStart = await getMetricsFor(
    'completion-count',
    primaryInterface,
    secondaryInterface1,
    secondaryInterface2
  );
  const quizCountStart = await getMetricsFor(
    'quiz-count',
    primaryInterface,
    secondaryInterface1,
    secondaryInterface2
  );

  browser.get(`/${primaryInterface}`);
  verifyRSVPWorks();
  takeQuiz();

  const completionCountEnd = await getMetricsFor(
    'completion-count',
    primaryInterface,
    secondaryInterface1,
    secondaryInterface2
  );
  const quizCountEnd = await getMetricsFor(
    'quiz-count',
    primaryInterface,
    secondaryInterface1,
    secondaryInterface2
  );

  testMetrics(
    'completion-count',
    completionCountStart,
    completionCountEnd,
    primaryInterface,
    secondaryInterface1,
    secondaryInterface2
  );

  testMetrics(
    'quiz-count',
    quizCountStart,
    quizCountEnd,
    primaryInterface,
    secondaryInterface1,
    secondaryInterface2
  );
}

export async function getMetricsFor(
  metricTitle: string,
  subjectInterfaceName: string,
  staticInterfaceName1: string,
  staticInterfaceName2: string
) {
  let subjectInterfaceNameCount: number;
  let staticInterfaceName1Count: number;
  let staticInterfaceName2Count: number;

  browser.get('/metrics');
  subjectInterfaceNameCount = await getMetricCountFor(subjectInterfaceName, metricTitle);
  staticInterfaceName1Count = await getMetricCountFor(staticInterfaceName1, metricTitle);
  staticInterfaceName2Count = await getMetricCountFor(staticInterfaceName2, metricTitle);

  return [
    subjectInterfaceNameCount,
    staticInterfaceName1Count,
    staticInterfaceName2Count
  ];
}

export function verifyRSVPWorks() {
  var until = protractor.ExpectedConditions;
  browser.wait(
    until.presenceOf(element(by.id('passage-title'))),
    5000,
    'Passage Title taking too long to appear in the DOM'
  );
  expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');

  let content = element(by.id('passage-content'));
  expect(content.getText()).toBe('Following');
  element(by.id('play-button')).click();
  browser.sleep(400);
  expect(content.getText()).not.toBe('Following');
  browser.wait(
    until.presenceOf(element(by.className('completion-message'))),
    5000,
    'Passage Completion message taking too long to appear'
  );
}
