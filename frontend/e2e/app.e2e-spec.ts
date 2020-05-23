import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('frontend App', () => {
  let page: FrontendPage;

  beforeEach(() => {
    page = new FrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Insert Contact');
  });

  it('should add and delete a new contact', function () {
    const timestamp = Date();
    page.navigateTo();
    expect(page.getParagraphText()).not.toContain(timestamp);
    element(by.name('firstName')).sendKeys(timestamp);
    element(by.name('lastName')).sendKeys(timestamp);
    element(by.name('phone')).sendKeys(timestamp);
    element(by.cssContainingText('.btn', 'Add')).click();

    page.navigateTo();
    let contact = element(by.cssContainingText('.row', timestamp));
    expect(contact).toBeDefined();

    contact.element(by.className('btn')).click();
    expect(page.getParagraphText()).not.toContain(timestamp);
  });
});
