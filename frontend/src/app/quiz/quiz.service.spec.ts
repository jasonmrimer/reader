import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizSubmission } from './QuizSubmission';
import { Quiz, quizzesStub } from './Quiz';

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

  it('should get quizzes', () => {
    service.getQuizzes().subscribe((response: Quiz[]) => {
      expect(response).toEqual(quizzesStub);
    })

    const request = httpMock.expectOne('http://localhost:4000/api/quizzes');
    expect(request.request.method).toBe('GET');
    request.flush(quizzesStub);
  });

  it('should post choices from a survey', fakeAsync(() => {
    const quizSubmission = new QuizSubmission(
      'quizId',
      {
        question1: 'answer1',
        question2: 'answer2',
        question3: 'answer3',
      },
      'interface name'
    );

    service
      .postAnswers(quizSubmission)
      .subscribe(() => {
      });

    const request = httpMock.expectOne('http://localhost:4000/api/quizzes');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(jasmine.objectContaining({
      passage: 'quizId',
      answers: [
        {question: 'question1', answer: 'answer1'},
        {question: 'question2', answer: 'answer2'},
        {question: 'question3', answer: 'answer3'},
      ],
      interfaceName: 'interface name'
    }));
    request.flush({});
  }));
});
