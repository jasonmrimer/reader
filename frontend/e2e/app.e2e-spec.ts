import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('frontend App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should fetch and display a passage', function () {
    browser.get('/baseline');
    expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');
    expect(element(by.id('passage-content')).getText()).toContain('Following a pair of last-second');
    expect(element(by.id('passage-content')).getText()).toContain('launch at least one SpaceX rocket every week');
  });

  //todo create a test to watch the play feature
  it('should present basic RSVP one word at a time', function () {
    page.navigateTo();
    expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');
    let content = element(by.id('passage-content'));
    expect(content.getText()).toBe('Following');
    element(by.id('play-button')).click();
    // browser.sleep(400).then(() => {
    //   // expect(element(by.id('passage-content')).getText()).toBe('of');
    // });
    // browser.driver.wait(function () {
    //   return content.getText().then(function (text) {
    //     return text === 'of';
    //   })
    // }, 4000, 'waiting for reader to change its content')
    //   .catch((waitError) => {
    //     return Promise.reject(`waited for content to change but it did not because of ${waitError}`);
    //   }
    // );

    // element(by.id('play-button')).click().then(() => {return setInterval(() => {}, 400)});
  });
});
