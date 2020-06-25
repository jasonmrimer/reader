import { browser, by, element, protractor } from 'protractor';

function getMetricRowByInterfaceName(rows, interfaceName: string) {
  let metricRow = rows.filter((row) => {
    let interfaceNameCell = row.element(by.className('interface-name'));
    return interfaceNameCell.getText().then(text => text === interfaceName);
  });
  return metricRow;
}

function getMetricCountFor(interfaceName: string) {
  let rows = element.all(by.className('metrics-row'));
  let metricRow = getMetricRowByInterfaceName(rows, interfaceName);
  let completionCountFromRow = getCompletionCountFromRow(metricRow);
  return completionCountFromRow;
}

async function getCompletionCountFromRow(metricRow) {
  let cellText = '0';
  let rowCount = await metricRow.count().then(count => {
    return count;
  });
  if (rowCount > 0) {
    cellText = await metricRow.get(0)
      .element(by.className('completion-count'))
      .getText()
      .then((text) => {
        return text;
      });
  }
  return Number.parseInt(cellText);
}

export async function testPassageCompletionAndMetricCaptureFor(
  url: string,
  subjectInterfaceName: string,
  staticInterfaceName1: string,
  staticInterfaceName2: string
) {
  let subjectInterfaceNameStartingCount: number;
  let staticInterfaceName1StartingCount: number;
  let staticInterfaceName2StartingCount: number;
  let subjectInterfaceNameUpdatedCount: number;
  let staticInterfaceName1UpdatedCount: number;
  let staticInterfaceName2UpdatedCount: number;

  browser.get('/metrics');
  subjectInterfaceNameStartingCount = await getMetricCountFor(subjectInterfaceName);
  staticInterfaceName1StartingCount = await getMetricCountFor(staticInterfaceName1);
  staticInterfaceName2StartingCount = await getMetricCountFor(staticInterfaceName2);
  browser.get(`/${url}`);
  verifyRSVPWorks();

  browser.get('/metrics');
  subjectInterfaceNameUpdatedCount = await getMetricCountFor(subjectInterfaceName);
  staticInterfaceName1UpdatedCount = await getMetricCountFor(staticInterfaceName1);
  staticInterfaceName2UpdatedCount = await getMetricCountFor(staticInterfaceName2);

  expect(subjectInterfaceNameUpdatedCount).toBe(
    subjectInterfaceNameStartingCount + 1,
    `Metrics did not add one ${subjectInterfaceName}`
  );
  expect(staticInterfaceName1UpdatedCount).toBe(
    staticInterfaceName1StartingCount,
    `Metrics erroneously added one to ${staticInterfaceName1}`
  );
  expect(staticInterfaceName2UpdatedCount).toBe(
    staticInterfaceName2StartingCount,
    `Metrics erroneously added one to ${staticInterfaceName2}`
  );
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
