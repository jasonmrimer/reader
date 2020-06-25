import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBasicComponent } from './quiz-basic.component';

describe('QuizBasicComponent', () => {
  let component: QuizBasicComponent;
  let fixture: ComponentFixture<QuizBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
