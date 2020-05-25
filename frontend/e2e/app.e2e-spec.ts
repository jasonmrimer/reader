import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';

require('inspector');

function verifyRSVPWorks() {
  expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');

  let content = element(by.id('passage-content'));
  expect(content.getText()).toBe('Following');
  element(by.id('play-button')).click();
  browser.sleep(100);
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
});
