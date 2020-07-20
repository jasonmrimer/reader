import { browser, by, element, protractor } from 'protractor';

export async function journeyReadAndQuiz(
  primaryInterface: string,
  secondaryInterfaces: string[]
) {
  const interfaces: { [key: string]: string; } = {
    primary: primaryInterface,
  };
  secondaryInterfaces.map((interfaceName, index) => {
    Object.assign(interfaces, {[`secondary${index + 1}`]: interfaceName});
  });

  const completionCountStart = await getMetricsFor('completion-count', interfaces);
  const quizCountStart = await getMetricsFor('quiz-count', interfaces);

  browser.get(`/${primaryInterface}/0`);
  verifyRSVPWorks();
  takeQuiz();

  const completionCountEnd = await getMetricsFor('completion-count', interfaces);
  const quizCountEnd = await getMetricsFor('quiz-count', interfaces);

  testMetrics(
    'completion-count',
    completionCountStart,
    completionCountEnd,
    interfaces
  );

  testMetrics(
    'quiz-count',
    quizCountStart,
    quizCountEnd,
    interfaces
  );
}

export async function getMetricsFor(
  metricTitle: string,
  interfaces: {[key: string]: string}
) {
  let subjectInterfaceNameCount: number;
  let staticInterfaceName1Count: number;
  let staticInterfaceName2Count: number;

  browser.get('/metrics');
  subjectInterfaceNameCount = await getMetricCountFor(interfaces['primary'], metricTitle);
  staticInterfaceName1Count = await getMetricCountFor(interfaces['secondary1'], metricTitle);
  staticInterfaceName2Count = await getMetricCountFor(interfaces['secondary2'], metricTitle);

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
  expect(element(by.id('passage-title')).getText()).toEqual('Test Passage');

  let content = element(by.id('passage-content'));
  expect(content.getText()).toBe(' ');
  element(by.className('button--play')).click();
  browser.sleep(400);
  expect(content.getText()).not.toBe(' ');
  browser.wait(
    until.presenceOf(element(by.className('completion-message'))),
    5000,
    'Passage Completion message taking too long to appear'
  );
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
  interfaces: {[key: string]: string}
) {
  expect(metricCountEnd[0]).toBe(
    metricCountStart[0] + 1,
    `Metrics did not a ${metricType} for ${interfaces['primary']}`
  );

  expect(metricCountEnd[1]).toBe(
    metricCountEnd[1],
    `Metrics erroneously added a ${metricType} to ${interfaces['secondary1']}`
  );

  expect(metricCountEnd[2]).toBe(
    metricCountEnd[2],
    `Metrics erroneously added a ${metricType} to ${interfaces['secondary2']}`
  );
}

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
