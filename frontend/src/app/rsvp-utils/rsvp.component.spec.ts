import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpComponent } from './rsvp.component';
import { passageStub } from './PassageStub';
import { PassageService } from './passage.service';
import { PassageServiceStub } from './passage-stub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RSVPService } from './rsvp.service';
import { MetricInterface } from '../metrics/metric';
import { MetricsService } from '../metrics/metrics.service';
import { MetricsServiceStub } from '../metrics/metrics-stub.service';

describe('RsvpComponent', () => {
  let component: RsvpComponent;
  let fixture: ComponentFixture<RsvpComponent>;
  let rsvpService: RSVPService;
  let passageService;
  let metricsService;

  beforeEach(async(() => {
    passageService = new PassageServiceStub();
    rsvpService = new RSVPService();
    metricsService = new MetricsServiceStub();
    spyOn(rsvpService, 'hydrate').and.callThrough();
    spyOn(metricsService, 'postPassageCompletion')

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RsvpComponent],
      providers: [
        {provide: PassageService, useValue: passageService},
        {provide: RSVPService, useValue: rsvpService},
        {provide: MetricsService, useValue: metricsService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpComponent);
    component = fixture.componentInstance;
    component.rsvpType = MetricInterface.RSVP_BASIC;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hydrate the rsvp service', () => {
    expect(rsvpService.hydrate).toHaveBeenCalledWith(passageStub, MetricInterface.RSVP_BASIC);
  });

  it('should fire a metrics post on passage complete', () => {
    rsvpService.contentLength = 2;
    expect(rsvpService.isComplete).toBeFalsy();
    rsvpService.moveAhead();
    rsvpService.moveAhead();
    expect(rsvpService.isComplete).toBeTrue();
    expect(metricsService.postPassageCompletion).toHaveBeenCalledWith(MetricInterface.RSVP_BASIC);
  });
});
