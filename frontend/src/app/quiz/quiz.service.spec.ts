import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { ReactSurveyModel } from 'survey-angular';

const surveyModelStub = new ReactSurveyModel({
  name: 'questionName',

});

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post answers from a survey', () => {
  //  setup a survey stub

  //  call the submission
  //  verify the http mock got hit with the right shape on a POST
  });
});
