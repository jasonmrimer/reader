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

  compareMetrics(
    'completion-count',
    completionCountStart,
    completionCountEnd,
    allInterfaces
  );

  compareMetrics(
    'quiz-count',
    quizCountStart,
    quizCountEnd,
    allInterfaces
  );
}

export async function getMetricsFor(
  metricTitle: string,
  interfaces: string[]
) {
  return browser.get('/metrics').then(() => {
    let counts = [];
    for (let i = 0; i < interfaces.length; i++) {
      getMetricCountFor(interfaces[i], metricTitle)
        .then((count) => counts.push(count))
        .catch((err) => {
          console.error('____getting metrics for ' + interfaces[i])
          console.error(err)
          console.error('____get metrics error end_______________')
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

function compareMetrics(
  metricType: string,
  metricCountStart: number[],
  metricCountEnd: number[],
  interfaces: string[]
) {
  expect(metricCountEnd[0]).toBe(
    metricCountStart[0] + 1,
    `Metrics did not a ${metricType} for ${interfaces['primary']}`
  );

  for (let i = 1; i < interfaces.length; i++) {
    expect(metricCountEnd[i]).toBe(
      metricCountEnd[i],
      `Metrics erroneously added a ${metricType} to ${interfaces[i]}`
    );
  }
}

function getMetricRowByInterfaceName(rows, interfaceName: string) {
  let metricRow = rows.filter((row) => {
    let interfaceNameCell = row.element(by.className('interface-name'));
    return interfaceNameCell.getText().then(text => text === interfaceName);
  });
  return metricRow;
}

export function getMetricCountFor(interfaceName: string, metricHeader: string): Promise<number> {
  let rows = element.all(by.className('metrics-row'));
  let metricRow = getMetricRowByInterfaceName(rows, interfaceName);
  return getMetricCountFromRow(metricRow, metricHeader);
}

async function getMetricCountFromRow(metricRow, metricHeader: string): Promise<number> {
  function rowExists(count) {
    return count > 0;
  }

  return metricRow.count().then(count => {
    if (rowExists(count)) {
      return metricRow.get(0)
        .element(by.className(metricHeader))
        .getText()
        .then(text => {
          return Number.parseInt(text)
        })
        .catch((err) => {
          console.error('____error getting metric count from row for ' + metricHeader);
          console.error(err)
          console.error('____end error getting metric count from row__________ ');
        })
    }
  })
}
