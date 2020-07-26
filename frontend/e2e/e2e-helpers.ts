import { browser, by, element, protractor } from 'protractor';
import * as _ from 'lodash';

function urlToInterfaceName(fullUrl: string) {
  return fullUrl
    .replace('http://localhost:4200/', '')
    .replace('/1', '');
}

export const visitAllPages = (
  allInterfaces: string[],
  actualUrls: Set<string>,
  expectedUrls: Set<string>
) => {
  if (actualUrls.size > 30) {
    expect(false).toBeTruthy('Visiting all page took more than 50 attempts.');
  }

  if (_.isEqual(expectedUrls, actualUrls)) {
    return;
  }
  browser.get('/')
    .then(() => element(by.className('button--start')).click())
    .then(() => browser.getCurrentUrl())
    .then((u) => {
      expect(actualUrls.has(u)).toBeFalsy(
        'App randomizer attempted to visit interface that is not the least used'
      );
      actualUrls.add(u);
      journey(
        urlToInterfaceName(u),
        allInterfaces
      ).then(() => {
        visitAllPages([], actualUrls, expectedUrls);
      });
    });
}

export const journey = async (subjectInterface: string, allInterfaces: string[]) => {
  let otherInterfaceNames = allInterfaces.filter(intName => intName !== subjectInterface);
  console.log(subjectInterface);
  console.log(otherInterfaceNames);

  await journeyReadAndQuiz(
    subjectInterface,
    otherInterfaceNames
  );
}

function isAngular(primaryInterface: string) {
  return primaryInterface != 'rsvp-subway';
}

export async function journeyReadAndQuiz(
  primaryInterface: string,
  secondaryInterfaces: string[]
) {

  let allInterfaces = [primaryInterface];
  allInterfaces = allInterfaces.concat(secondaryInterfaces);

  const completionCountStart = await getMetricsFor('completion-count', allInterfaces);
  const quizCountStart = await getMetricsFor('quiz-count', allInterfaces);

  browser.get(`/${primaryInterface}/0`).then(() => {
    verifyRSVPWorks(primaryInterface);
    takeQuiz(primaryInterface);
  });

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

function readInstructionsAndStart() {
  expect(element(by.className('instructions'))).toBeTruthy();
  element(by.className('button--play')).click();
}

export function verifyRSVPWorks(primaryInterface: string) {
  browser.waitForAngularEnabled(isAngular(primaryInterface)).then(() => {
    const until = protractor.ExpectedConditions;
    browser.wait(
      until.presenceOf(element(by.className('passage-title'))),
      5000,
      'Passage Title taking too long to appear in the DOM'
    );
    expect(element(by.className('passage-title')).getText()).toEqual('Test Passage');

    readInstructionsAndStart();

    browser.wait(
      until.presenceOf(element(by.className('container--completion'))),
      20000,
      'Passage Completion message taking too long to appear'
    );
    if (!isAngular(primaryInterface)) {
      browser.sleep(3000).then(() => {
        console.log('waited for non angular completion metric post')
      });
    }
  });
}

export function takeQuiz(interfaceName: string) {
  browser.waitForAngularEnabled(isAngular(interfaceName))
    .then(() => {
      element(by.className('button--quiz')).click();
      element(by.css('[aria-label="fox"]')).click();
      element(by.css('[aria-label="Augusta"]')).click();
      element(by.className('sv_complete_btn')).click();
    });
}

function compareMetrics(
  metricType: string,
  metricCountStart: number[],
  metricCountEnd: number[],
  interfaces: string[]
) {
  expect(metricCountEnd[0]).toBe(
    metricCountStart[0] + 1,
    `Metrics did not a ${metricType} for ${interfaces[0]}`
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
