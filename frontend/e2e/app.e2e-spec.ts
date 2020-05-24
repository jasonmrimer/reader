import { FrontendPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';
require('inspector');

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
    page.navigateTo();
    expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');

    let content = element(by.id('passage-content'));
    expect(content.getText()).toBe('Following');
    element(by.id('play-button')).click();
    browser.sleep(100);
    expect(content.getText()).not.toBe('Following');
  });
});
