import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';
import { journeyReadAndQuiz } from './e2e-helpers';

describe('Reader App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should fetch and display a passage on baseline', function () {
    browser.get('/baseline/0');
    expect(element(by.id('passage-title')).getText()).toEqual('Test Passage');
    expect(element(by.id('passage-content')).getText()).toContain('First sentence.');
    expect(element(by.id('passage-content')).getText()).toContain('Last section.');
  });

  it('should use RSVP Basic to read passage, take quiz, and update metrics', async () => {
    await journeyReadAndQuiz(
      'rsvp-basic',
      ['rsvp-progress-bar', 'rsvp-section-mark']
    );
  });

  it('should use RSVP Progress Bar to read passage, take quiz, and update metrics', async () => {
    await journeyReadAndQuiz(
      'rsvp-progress-bar',
      ['rsvp-basic', 'rsvp-section-mark']
    );
    browser.get('/rsvp-progress-bar/0');
    expect(element(by.id('progress-bar'))).toBeDefined();
  });

  it('should use RSVP Section Mark to read passage, take quiz, and update metrics', async () => {
    await journeyReadAndQuiz(
      'rsvp-section-mark',
      ['rsvp-basic', 'rsvp-progress-bar']
    );
    browser.get('/rsvp-section-mark/0');
    expect(element(by.id('completion-meter'))).toBeDefined();
    expect(element.all(by.className('slider-tick')).count()).toBe(4);
  });

  xit('should use RSVP Subway to read passage, take quiz, and update metrics', async () => {
    await journeyReadAndQuiz(
      'rsvp-subway',
      ['rsvp-basic', 'rsvp-section-mark']
    );
  });
});

