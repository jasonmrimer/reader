import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './reader.component';
import { By } from '@angular/platform-browser';
import { IntervalService } from './interval.service';
import { IntervalServiceMock } from './interval.service.mock.spec';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { passageStub } from '../rsvp-utils/PassageStub';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MetricInterface } from '../metrics/metric';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;
  let titleBox;
  let contentBox;
  let intervalServiceMock: IntervalServiceMock;
  let rsvpService: RSVPService;
  let router;

  beforeEach(async(() => {
    intervalServiceMock = new IntervalServiceMock();
    rsvpService = new RSVPService();
    rsvpService.hydrate(passageStub, MetricInterface.RSVP_BASIC);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ReaderComponent],
      providers: [
        {provide: IntervalService, useValue: intervalServiceMock},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;
    component.rsvpService = rsvpService;
    fixture.detectChanges();

    titleBox = fixture.debugElement.query(By.css('#passage-title'));
    contentBox = fixture.debugElement.query(By.css('#text-joiner'));
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title for a passage', function () {
    expect(titleBox.nativeElement.textContent).toBe('title01');
  });

  it('should move to the next word as the interval ticks', () => {
    expect(contentBox.nativeElement.textContent).toEqual(' ');
    const playButton = fixture.debugElement.query(By.css('#play-button'));
    playButton.nativeElement.click();
    fixture.detectChanges();
    expect(contentBox.nativeElement.textContent).toBe('One');
  });

  it('should stop moving ahead on completion', () => {
    component.playReader();
    while (!component.rsvpService.isComplete) {
      intervalServiceMock.tick();
    }
    expect(intervalServiceMock.clearInterval).toHaveBeenCalled();
  });

  it('should pause the display', () => {
    const pauseButton = fixture.debugElement.query(By.css('#pause-button'));
    pauseButton.nativeElement.click();
    expect(intervalServiceMock.clearInterval).toHaveBeenCalled();
  });

  it('should display ar completion message at finish', () => {
    expect(fixture.debugElement.query(By.css('.completion-message'))).toBeFalsy();
    completePassage();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.completion-message'))).toBeTruthy();
  });

  it('should present a button to take a quiz at finish', () => {
    expect(fixture.debugElement.query(By.css('input[value="Take Quiz"]'))).toBeFalsy();
    completePassage();
    expect(fixture.debugElement.query(By.css('input[value="Take Quiz"]'))).toBeTruthy();
  });

  it('should navigate to a quiz on click', async () => {
    spyOn(router, 'navigate').and.returnValue(true);
    completePassage();
    const quizButton = fixture.debugElement.query(By.css('input[value="Take Quiz"]'));
    quizButton.nativeElement.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/quiz', 'rsvp-basic']);
  });

  function completePassage() {
    while (!component.rsvpService.isComplete) {
      component.rsvpService.moveAhead();
    }
    fixture.detectChanges();
  }
});
