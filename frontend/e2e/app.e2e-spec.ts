import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';
import { journey } from './e2e-helpers';

describe('Reader App', () => {
  let page: FrontendPage;
  const allInterfaces = [
    'baseline',
    'rsvp-basic',
    'rsvp-progress-bar',
    'rsvp-section-mark',
    'rsvp-subway'
  ];

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should use Baseline to read passage, take quiz, and update metrics', async () => {
    await journey('baseline', allInterfaces);
  });


  it('should use RSVP Basic to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-basic', allInterfaces);
  });

  it('should use RSVP Progress Bar to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-progress-bar', allInterfaces);
    browser.get('/rsvp-progress-bar/0');
    expect(element(by.id('progress-bar'))).toBeDefined();
  });

  it('should use RSVP Section Mark to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-section-mark', allInterfaces);
    browser.get('/rsvp-section-mark/0');
    expect(element(by.id('completion-meter'))).toBeDefined();
    expect(element.all(by.className('slider-tick')).count()).toBe(4);
  });

  it('should use RSVP Subway to read passage, take quiz, and update metrics', async () => {
    await journey('rsvp-subway', allInterfaces);
  });
});

