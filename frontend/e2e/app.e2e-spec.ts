import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';
import { journeyReadAndQuiz } from './e2e-helpers';

describe('Reader App', () => {
  let page: FrontendPage;
  const allInterfaces = [
    'baseline',
    'rsvp-basic',
    'rsvp-progress-bar',
    'rsvp-section-mark',
    'rsvp-subway'
  ]

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should fetch and display a passage on baseline', function () {
    browser.get('/baseline/0');
    expect(element(by.className('instructions')).getText()).toContain('Take about 2 minutes to read the following passage.')
    element(by.className('button--play')).click();
    expect(element(by.className('passage-title')).getText()).toEqual('Test Passage');
    expect(element(by.className('passage-content')).getText()).toContain('First sentence.');
    expect(element(by.className('passage-content')).getText()).toContain('Last section.');
    browser.sleep(8000);
    expect(by.className('button--quiz')).toBeDefined();
  });

  const journey = async (interfaceName: string) => {
    await journeyReadAndQuiz(
      interfaceName,
      allInterfaces.filter(intName => intName !== interfaceName)
    );
  }
  it('should use RSVP Basic to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-basic');
  });

  it('should use RSVP Progress Bar to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-progress-bar');
    browser.get('/rsvp-progress-bar/0');
    expect(element(by.id('progress-bar'))).toBeDefined();
  });

  it('should use RSVP Section Mark to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-section-mark');
    browser.get('/rsvp-section-mark/0');
    expect(element(by.id('completion-meter'))).toBeDefined();
    expect(element.all(by.className('slider-tick')).count()).toBe(4);
  });

  it('should use RSVP Subway to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-subway');
  });
});

