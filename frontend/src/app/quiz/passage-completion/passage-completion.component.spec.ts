import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageCompletionComponent } from './passage-completion.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('PassageCompletionComponent', () => {
  let component: PassageCompletionComponent;
  let fixture: ComponentFixture<PassageCompletionComponent>;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ PassageCompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageCompletionComponent);
    component = fixture.componentInstance;
    component.quizRoute = 'fake-route';
    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a quiz on click', async () => {
    spyOn(router, 'navigate').and.returnValue(true);
    const quizButton = fixture.debugElement.query(By.css('input[value="Take Quiz"]'));
    quizButton.nativeElement.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/quiz', 'fake-route']);
  });
});
