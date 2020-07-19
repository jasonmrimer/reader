import { FrontendPage } from './app.po';
import { browser, by, element } from 'protractor';
import { journeyReadAndQuiz } from './e2e-helpers';

describe('Reader App', () => {
  it('should take a user on a multi-interface journey', () => {
    //  todo clear metric db, equalizing all interface stats
    // for i =0 to interface.count {
    //    nav to homepage
    //    start
    //    log to which interface it takes us
    //    highjack interface and use test passage on that interface for speed TODO consider varying the wpm (when we have multiple Passages we'll need to test no repeat passages, too)
    //    grab current metrics (started, finished, quiz)
    //    read through
    //    take quiz
    //    grab new metrics (started, finished, quiz)
    //    return to home page
    //  }
  //  expect logged interfaces to contain all the interfaces
  //  expect completion message because user cannot take any more (taints results)
  });
});
