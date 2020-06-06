import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { quizStub } from './Quiz';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { of } from 'rxjs';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  const quizServiceSpy = jasmine.createSpyObj('QuizService', ['getQuizzes', 'postAnswers', 'check']);
  quizServiceSpy.getQuizzes.and.returnValue(of([quizStub]));
  quizServiceSpy.check.and.returnValue('spy');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: QuizService, useValue: quizServiceSpy}
      ],
      declarations: [QuizComponent]
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

  it('should display questions and choices', () => {
    expect(fixture.debugElement.queryAll(By.css('.sv_q_title')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('.sv_q_radiogroup_control_item')).length).toBe(8);
  });

  it('should submit a set of choices', () => {
    let choices = fixture.debugElement.queryAll(By.css('input[type=radio]'));
    choices.map((choice) => {
      if (
        choice.nativeElement.value === 'answer1.1'
        || choice.nativeElement.value === 'answer2.2') {
        choice.nativeElement.click();
      }
    })
    let completeButton = fixture.debugElement.query(By.css("input[type=button][value='Complete']"));
    expect(completeButton).toBeTruthy();
    completeButton.nativeElement.click();
    expect(quizServiceSpy.postAnswers).toHaveBeenCalledWith(jasmine.objectContaining(
      {
        quizId: 'id1',
        answers: [
          {
            question: 'question1',
            answer: 'answer1.1'
          },
          {
            question: 'question2',
            answer: 'answer2.2'
          },
        ]
      })
    );
  });
});
