import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';
import { testPassageCompletionAndMetricCaptureFor, verifyRSVPWorks } from './e2e-helpers';

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

  it('should take a quiz', () => {
    browser.get('/rsvp-basic');
    verifyRSVPWorks();
    element(by.id('take-quiz')).click();
  //  select Fox
  //  select Albany
  //  submit quiz
  //  expect %50
  //  navigate to Metrics
  //  expect rsvp-basic quiz to be +1
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
});

