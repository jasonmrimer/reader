import { FrontendPage } from './app.po';
import { by, element } from 'protractor';

describe('frontend App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should fetch and display a passage', function () {
    page.navigateTo();
    expect(element(by.id('passage-title')).getText()).toEqual('For SpaceX, Third Launch is Charm');
    expect(element(by.id('passage-content')).getText()).toContain('Following a pair of last-second');
    expect(element(by.id('passage-content')).getText()).toContain('launch at least one SpaceX rocket every week');
  });

  //todo create a test to watch the play feature
});
