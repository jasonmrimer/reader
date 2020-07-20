import { browser, by, element, protractor } from 'protractor';

function extractInterfaceNameFromUrl(fullUrl: string) {
  return fullUrl
    .replace('http://localhost:4200/', '')
    .replace('/1', '');
}

export async function useAndTestInterface(currentUrl: string, allUrls: Set<string>) {
  let primaryInterface = extractInterfaceNameFromUrl(currentUrl);
  let secondaryInterfaces: string[] = [];
  allUrls.forEach((url) => {
    secondaryInterfaces.push(extractInterfaceNameFromUrl(url));
  })
  secondaryInterfaces = secondaryInterfaces.filter((interfaceName) => interfaceName !== primaryInterface);
  console.log(primaryInterface);
  switch (primaryInterface) {
    case 'baseline':
      baselineJourney();
      break;
    case 'rsvp-basic':
      await journeyReadAndQuiz(
        'rsvp-basic',
        ['rsvp-progress-bar', 'rsvp-section-mark']
      );
      break;
    case 'rsvp-progress-bar':
      await journeyReadAndQuiz(
        'rsvp-progress-bar',
        ['rsvp-basic', 'rsvp-section-mark']
      );
      browser.get('/rsvp-progress-bar/0');
      expect(element(by.id('progress-bar'))).toBeDefined();
      break;
    case 'rsvp-section-mark':
      await journeyReadAndQuiz(
        'rsvp-section-mark',
        ['rsvp-basic', 'rsvp-progress-bar']
      );
      browser.get('/rsvp-section-mark/0');
      expect(element(by.id('completion-meter'))).toBeDefined();
      expect(element.all(by.className('slider-tick')).count()).toBe(4);
      break;
    default:
      console.log('subway');
    // case 'rsvp-subway':
    //   await journeyReadAndQuiz(
    //     'rsvp-subway',
    //     ['rsvp-basic', 'rsvp-section-mark']
    //   );
  }
}

const baselineJourney = () => {
  browser.get('/baseline/0');
  expect(element(by.className('instructions')).getText()).toContain('Take about 2 minutes to read the following passage.')
  element(by.className('button--play')).click();
  expect(element(by.id('passage-title')).getText()).toEqual('Test Passage');
  expect(element(by.id('passage-content')).getText()).toContain('First sentence.');
  expect(element(by.id('passage-content')).getText()).toContain('Last section.');
  browser.sleep(8000);
  expect(by.className('button--quiz')).toBeDefined();
}


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
  let allInterfaces = [primaryInterface];
  allInterfaces = allInterfaces.concat(secondaryInterfaces);

  const completionCountStart = await getMetricsFor('completion-count', allInterfaces);
  const quizCountStart = await getMetricsFor('quiz-count', allInterfaces);

  browser.get(`/${primaryInterface}/0`);
  verifyRSVPWorks();
  takeQuiz();

  const completionCountEnd = await getMetricsFor('completion-count', allInterfaces);
  const quizCountEnd = await getMetricsFor('quiz-count', allInterfaces);

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
  interfaces: string[]
) {

  return browser.get('/metrics').then(() => {
    let counts = [];
    for (let i = 0; i < interfaces.length; i++) {
      getMetricCountFor(interfaces[i], metricTitle).then((count) => {
        counts.push(count);
      });
    }

    return counts;
  });
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
    until.presenceOf(element(by.className('container--completion'))),
    5000,
    'Passage Completion message taking too long to appear'
  );
}

export function takeQuiz() {
  element(by.className('button--quiz')).click();
  element(by.css('[aria-label="fox"]')).click();
  element(by.css('[aria-label="Augusta"]')).click();
  element(by.className('sv_complete_btn')).click();
}

function testMetrics(
  metricType: string,
  metricCountStart: number[],
  metricCountEnd: number[],
  interfaces: { [key: string]: string }
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
