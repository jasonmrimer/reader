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

  xit('should fetch and display a passage on baseline', function () {
    browser.get('/baseline');
    expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');
    expect(element(by.id('passage-content')).getText()).toContain('Following a pair of last-second');
    expect(element(by.id('passage-content')).getText()).toContain('launch at least one SpaceX rocket every week');
  });

  xit('should present basic RSVP one word at a time', () => {
    browser.get('/rsvp-basic');
    verifyRSVPWorks();
  });

  xit('should present RSVP with a completion bar', () => {
    browser.get('/rsvp-progress-bar');
    verifyRSVPWorks();
    expect(element(by.id('progress-bar'))).toBeDefined();
  });

  xit('should present RSVP with a completion bar with markers', () => {
    browser.get('/rsvp-section-mark');
    verifyRSVPWorks();
    expect(element(by.id('completion-meter'))).toBeDefined();
    expect(element.all(by.className('slider-tick')).count()).toBe(4);
  });

  xit('should take a quiz', () => {
    expect(false).toBeTruthy();
  });

  it('should add a new read count to the metrics page after completing a passage', async () => {
    //  capture count of Basic
    //  capture count of Progress Bar
    //  complete basic reading
    //  assert basic count + 1
    //  assert progress unchange
    //  complete progress bar
    //  assert progress bar + 1
    //  assert basic unchanged

    let rsvpBasicStartingCount: number;
    let rsvpProgressBarStartingCount: number;
    let rsvpSectionMarkStartingCount: number;
    let rsvpBasicUpdatedCount: number;
    let rsvpProgressBarUpdatedCount: number;
    let rsvpSectionMarkUpdatedCount: number;

    browser.get('/metrics');
    rsvpBasicStartingCount = await getMetricCountFor('RSVP Basic');
    console.log('basic start' + rsvpBasicStartingCount);
    rsvpProgressBarStartingCount = await getMetricCountFor('RSVP Progress Bar');
    rsvpSectionMarkStartingCount = await getMetricCountFor('RSVP Section Mark');
    browser.get('/rsvp-basic');
    verifyRSVPWorks();

    browser.get('/metrics');
    rsvpBasicUpdatedCount = await getMetricCountFor('RSVP Basic');
    console.log('basic update' + rsvpBasicUpdatedCount);
    rsvpProgressBarUpdatedCount = await getMetricCountFor('RSVP Progress Bar');
    rsvpSectionMarkUpdatedCount = await getMetricCountFor('RSVP Section Mark');
    expect(rsvpBasicUpdatedCount).toBe(
      rsvpBasicStartingCount + 1,
      'Metrics did not add one RSVP Basic'
    );
    expect(rsvpProgressBarUpdatedCount).toBe(
      rsvpProgressBarStartingCount,
      'Metrics erroneously added one to RSVP Progress Bar'
    );
    expect(rsvpSectionMarkUpdatedCount).toBe(
      rsvpSectionMarkStartingCount,
      'Metrics erroneously added one to RSVP Section Mark'
    );
  });

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
});
