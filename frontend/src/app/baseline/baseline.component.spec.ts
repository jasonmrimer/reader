import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineComponent } from './baseline.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { passageStub } from '../rsvp-utils/PassageStub';
import { By } from '@angular/platform-browser';
import { IntervalServiceMock } from '../reader/interval.service.mock.spec';
import { IntervalService } from '../reader/interval.service';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { PassageCompletionComponent } from '../quiz/passage-completion/passage-completion.component';
import { RouterTestingModule } from '@angular/router/testing';
import { InterfaceName } from '../session/InterfaceName';

describe('BaselineComponent', () => {
  let component: BaselineComponent;
  let fixture: ComponentFixture<BaselineComponent>;
  let rsvpService: RSVPService;
  let intervalService: IntervalServiceMock;

  beforeEach(async(() => {
    intervalService = new IntervalServiceMock();
    rsvpService = new RSVPService();
    rsvpService.hydrate(passageStub, InterfaceName.BASELINE);
    spyOn(intervalService, 'runInterval').and.callThrough();


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [BaselineComponent, PassageCompletionComponent],
      providers: [
        {provide: IntervalService, useValue: intervalService},
        {provide: RSVPService, useValue: rsvpService},
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              'passageId': '0'
            }))
          }
        }
      ],
    })
      .compileComponents();
  }));

  afterEach(() => {
    fixture.destroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  function testPreStartConditions() {
    expect(fixture.debugElement.query(By.css('.container--instructions'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.container--passage'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.passage-title'))).toBeTruthy();
  }

  it('should start with instructions', () => {
    testPreStartConditions();
  });

  it('should turn instructions off and begin reading on start', () => {
    testPreStartConditions();
    fixture.debugElement.query(By.css('.button--play')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.container--passage'))).toBeTruthy();
    expect(intervalService.runInterval).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.passage-title')).nativeElement.textContent).toBe('title01');
    expect(fixture.debugElement.query(By.css('.passage-content')).nativeElement.textContent).toContain(
      '\nOne two. Three.\n\nFour, five; six!\n\nSeven... eight?');

    expect(fixture.debugElement.query(By.css('.container--instructions'))).toBeFalsy();
  });

  it('should prompt to take quiz on completion', () => {
    completePassage(rsvpService, intervalService, fixture);
    expect(fixture.debugElement.nativeElement.querySelector('app-passage-completion')).toBeTruthy();
  });
});

function completePassage(rsvpService: RSVPService, intervalService: IntervalServiceMock, fixture: ComponentFixture<BaselineComponent>) {
  expect(rsvpService.isCompleteSubject).toBeFalsy();
  for (let i = 0; i < 9; i++) {
    intervalService.tick();
  }
  expect(rsvpService.isCompleteSubject).toBeTruthy();
  fixture.detectChanges();
}
