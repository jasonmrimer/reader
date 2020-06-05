import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { Quiz, quizStub } from './Quiz';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
class QuizServiceMock extends QuizService {
  check() {
    return 'fake';
  }
  getQuizzes(): Observable<Quiz[]> {
    return of([quizStub]);
  }
}

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  const quizServiceSpy = jasmine.createSpyObj('QuizService', ['getQuizzes', 'check']);
  quizServiceSpy.getQuizzes.and.returnValue(of([quizStub]));
  quizServiceSpy.check.and.returnValue('spy');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: QuizService, useValue: quizServiceSpy}
      ],
      declarations: [ QuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    component.quiz = quizStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display questions and answers', async () => {
    await expect(fixture.debugElement.queryAll(By.css('.sv_q_title')).length).toBe(2);
    await expect(fixture.debugElement.queryAll(By.css('.sv_q_radiogroup_control_item')).length).toBe(8);
  });

  it('should submit a set of answers', () => {
  //  select answers
  //  click submit
  //  spy on service?
  });
});
