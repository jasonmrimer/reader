import { FrontendPage } from './app.po';
import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';

require('inspector');

function verifyRSVPWorks() {
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

describe('Reader App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should fetch and display a passage on baseline', function () {
    browser.get('/baseline');
    expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');
    expect(element(by.id('passage-content')).getText()).toContain('Following a pair of last-second');
    expect(element(by.id('passage-content')).getText()).toContain('launch at least one SpaceX rocket every week');
  });

  xit('should take a quiz', () => {
    expect(false).toBeTruthy();
  });

  it(
    'should add complete a passage with RSVP Basic and increase the completion count on the metrics page'
    , async () => {
    await testPassageCompletionAndMetricCaptureFor(
      'rsvp-basic',
      'RSVP Basic',
      'RSVP Progress Bar',
      'RSVP Section Mark'
    );
  });

  it(
    'should add complete a passage with a Progress Bar and increase the completion count on the metrics page',
    async () => {
      await testPassageCompletionAndMetricCaptureFor(
        'rsvp-progress-bar',
        'RSVP Progress Bar',
        'RSVP Basic',
        'RSVP Section Mark'
      );
      browser.get('/rsvp-progress-bar');
      expect(element(by.id('progress-bar'))).toBeDefined();
    }
  );

  it(
    'should add complete a passage with a Section Markers and increase the completion count on the metrics page',
    async () => {
      await testPassageCompletionAndMetricCaptureFor(
        'rsvp-section-mark',
        'RSVP Section Mark',
        'RSVP Progress Bar',
        'RSVP Basic',
      );
      browser.get('/rsvp-section-mark');
      expect(element(by.id('completion-meter'))).toBeDefined();
      expect(element.all(by.className('slider-tick')).count()).toBe(4);
    }
  );

  function getMetricRowByInterfaceName(rows, interfaceName: string) {
    let metricRow = rows.filter((row) => {
      let interfaceNameCell = row.element(by.className('interface-name'));
      return interfaceNameCell.getText().then(text => text === interfaceName);
    });
    return metricRow;
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

  function getMetricCountFor(interfaceName: string) {
    let rows = element.all(by.className('metrics-row'));
    let metricRow = getMetricRowByInterfaceName(rows, interfaceName);
    let completionCountFromRow = getCompletionCountFromRow(metricRow);
    return completionCountFromRow;
  }

  async function testPassageCompletionAndMetricCaptureFor(
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
});
