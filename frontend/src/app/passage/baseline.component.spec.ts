import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaselineComponent } from './baseline.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { PassageService } from '../rsvp-utils/passage.service';
import { PassageServiceStub } from '../rsvp-utils/passage-stub.service';
import { passageStub } from '../rsvp-utils/PassageStub';
import { By } from '@angular/platform-browser';
import { IntervalServiceMock } from '../reader/interval.service.mock.spec';
import { IntervalService } from '../reader/interval.service';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { MetricsServiceStub } from '../metrics/metrics-stub.service';
import { MetricsService } from '../metrics/metrics.service';
import { MetricInterface } from '../metrics/metric';

describe('PassageComponent', () => {
  let component: BaselineComponent;
  let fixture: ComponentFixture<BaselineComponent>;
  let passageService: PassageService;
  let rsvpService: RSVPService;
  let intervalService: IntervalServiceMock;
  let metricsService: MetricsServiceStub;

  beforeEach(async(() => {
    intervalService = new IntervalServiceMock();
    rsvpService = new RSVPService();
    rsvpService.hydrate(passageStub, MetricInterface.BASELINE)


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BaselineComponent],
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
    expect(fixture.debugElement.query(By.css('.instructions'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.container--passage'))).toBeFalsy();
  }

  it('should start with instructions', () => {
    testPreStartConditions();
  });

  it('should turn instructions off and begin reading on start', () => {
    testPreStartConditions();
    fixture.debugElement.query(By.css('.button--start')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.container--passage'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.passage-title')).nativeElement.textContent).toBe('title01');
    expect(fixture.debugElement.query(By.css('.passage-content')).nativeElement.textContent).toBe(
      'One two. Three.\nFour, five; six!\n\nSeven... eight?');
    expect(fixture.debugElement.query(By.css('.instructions'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.button--start'))).toBeFalsy();
  });

  it('should prompt to take quiz on completion', () => {
    for (let i = 0; i < 8; i++) {
      intervalService.tick();
    }
    expect(intervalService.interval).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.button--quiz'))).toBeTruthy();
  });
});
