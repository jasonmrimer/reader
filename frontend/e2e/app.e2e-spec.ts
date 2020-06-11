import { FrontendPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';
import { count } from 'rxjs/operators';

require('inspector');

function verifyRSVPWorks() {
  var until = protractor.ExpectedConditions;
  browser.wait(until.presenceOf(element(by.id('passage-title'))), 5000, 'Passage Title taking too long to appear in the DOM');
  expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');

  let content = element(by.id('passage-content'));
  expect(content.getText()).toBe('Following');
  element(by.id('play-button')).click();
  browser.sleep(400);
  expect(content.getText()).not.toBe('Following');
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

  it('should present basic RSVP one word at a time', () => {
    browser.get('/rsvp-basic');
    verifyRSVPWorks();
  });

  it('should present RSVP with a completion bar', () => {
    browser.get('/rsvp-progress-bar');
    verifyRSVPWorks();
    expect(element(by.id('progress-bar'))).toBeDefined();
  });

  it('should present RSVP with a completion bar with markers', () => {
    browser.get('/rsvp-section-mark');
    verifyRSVPWorks();
    expect(element(by.id('completion-meter'))).toBeDefined();
    expect(element.all(by.className('slider-tick')).count()).toBe(4);
  });

  xit('should take a quiz', () => {
    expect(false).toBeTruthy();
  });

  it('should add a new read count to the metrics page after completing a passage', () => {
    // capture count
    let count: number = 0;
    browser.get('/metrics');
    element(by.id('count-rsvp-basic')).getText().then((text) =>
      count = Number.parseInt(text, 10)
    );
    browser.get('/rsvp-basic');
    verifyRSVPWorks();
    browser.get('/metrics');
    expect(element(by.id('count-rsvp-basic')).getText()).toBe(count + 1);
    //  wait for Passage Complete
    //  go to metrics
    //  check count for rsvp-basic is count + 1
  });
});
