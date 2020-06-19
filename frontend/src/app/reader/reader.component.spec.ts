import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComponent } from './reader.component';
import { By } from '@angular/platform-browser';
import { IntervalService } from './interval.service';
import { IntervalServiceMock } from './interval.service.mock.spec';
import { RSVPService } from '../rsvp-basic/rsvp.service';

describe('ReaderComponent', () => {
  let component: ReaderComponent;
  let fixture: ComponentFixture<ReaderComponent>;
  let titleBox;
  let contentBox;
  let intervalServiceMock: IntervalServiceMock;
  let rsvpService;

  beforeEach(async(() => {
  }));

  beforeEach(() => {
    intervalServiceMock = new IntervalServiceMock();
    rsvpService = new RSVPService();

    TestBed.configureTestingModule({
      declarations: [ReaderComponent],
      providers: [
        {provide: IntervalService, useValue: intervalServiceMock},
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ReaderComponent);
    component = fixture.componentInstance;

    component.title = 'fake title';
    component.content = ['one', 'two', 'three'];
    component.rsvpService = rsvpService;
    rsvpService.contentLength = 4;
    fixture.detectChanges();

    titleBox = fixture.debugElement.query(By.css('#passage-title'));
    contentBox = fixture.debugElement.query(By.css('#passage-content'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title for a passage', function () {
    expect(titleBox.nativeElement.textContent).toBe('fake title');
  });

  it('should move to the next word as the interval ticks', () => {
    expect(contentBox.nativeElement.textContent).toBe('one');
    const playButton = fixture.debugElement.query(By.css('#play-button'));
    playButton.nativeElement.click();
    fixture.detectChanges();
    expect(contentBox.nativeElement.textContent).toBe('two');
  });

  it('should stop  moving ahead on completion', () => {
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

  it('should display a completion message at finish', () => {
    expect(fixture.debugElement.query(By.css('.completion-message'))).toBeFalsy();
    while (!component.rsvpService.isComplete) {
      component.rsvpService.moveAhead();
    }
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.completion-message'))).toBeTruthy();
  });

});
