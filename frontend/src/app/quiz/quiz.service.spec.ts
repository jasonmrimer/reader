import {fakeAsync, TestBed} from '@angular/core/testing';

import {QuizService} from './quiz.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {QuizSubmission} from './QuizSubmission';
import {Quiz, quizStub, quizzesStub} from './Quiz';
import {PassageName} from '../session/PassageName';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get quizzes', () => {
    service.getQuizzes().subscribe((response: Quiz[]) => {
      expect(response).toEqual(quizzesStub);
    });

    const request = httpMock.expectOne('http://localhost:4000/api/quizzes');
    expect(request.request.method).toBe('GET');
    request.flush(quizzesStub);
  });

  it('should get a quiz matching the passage provided', () => {
    service.getQuiz(PassageName.ONE).subscribe((response: Quiz) => {
      expect(response).toEqual(quizStub);
    });

    const request = httpMock.expectOne('http://localhost:4000/api/quizzes/1');
    expect(request.request.method).toBe('GET');
    request.flush(quizStub);
  });

  it('should post choices from a survey', fakeAsync(() => {
    const quizSubmission = new QuizSubmission('quizId', {
      question1: 'answer1',
      question2: 'answer2',
      question3: 'answer3',
    }, 'interface name', 'fakeUser', new Date());

    service
      .postAnswers(quizSubmission)
      .subscribe(() => {
      });

    const request = httpMock.expectOne('http://localhost:4000/api/quizzes');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.passage).toEqual('quizId');
    expect(request.request.body.answers).toEqual([
      {question: 'question1', answer: 'answer1'},
      {question: 'question2', answer: 'answer2'},
      {question: 'question3', answer: 'answer3'},
    ]);
    expect(request.request.body.interfaceName).toEqual('interface name');
    expect(request.request.body.user).toEqual('fakeUser');
    expect(request.request.body.date).toBeDefined();
    request.flush({});
  }));
});
