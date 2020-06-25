import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';
import { journeyReadAndQuiz } from './e2e-helpers';

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

  it('should use RSVP Basic to read passage, take quiz, and update metrics', async () => {
    await journeyReadAndQuiz(
      'rsvp-basic',
      'rsvp-progress-bar',
      'rsvp-section-mark'
    );
  });

  it('should use RSVP Progress Bar to read passage, take quiz, and update metrics', async () => {
    await journeyReadAndQuiz(
      'rsvp-progress-bar',
      'rsvp-basic',
      'rsvp-section-mark'
    );
    browser.get('/rsvp-progress-bar');
    expect(element(by.id('progress-bar'))).toBeDefined();
  });

  it('should use RSVP Section Mark to read passage, take quiz, and update metrics', async () => {
    await journeyReadAndQuiz(
      'rsvp-progress-bar',
      'rsvp-basic',
      'rsvp-section-mark'
    );
    browser.get('/rsvp-section-mark');
    expect(element(by.id('completion-meter'))).toBeDefined();
    expect(element.all(by.className('slider-tick')).count()).toBe(4);
  });
});

