import { getTestBed, TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { ReactSurveyModel } from 'survey-angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const surveyModelStub = new ReactSurveyModel({
  name: 'questionName',

});

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post answers from a survey', () => {
  //  setup a survey stub

  //  call the submission
  //  verify the http mock got hit with the right shape on a POST
    const request = httpMock.expectOne('http://localhost:4000/api/passages');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({}); //todo
  });
});
