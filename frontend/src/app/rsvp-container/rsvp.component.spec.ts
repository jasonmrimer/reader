import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpComponent } from './rsvp.component';
import { passageStub } from '../rsvp-basic/PassageStub';
import { PassageService } from '../passage/passage.service';
import { PassageServiceStub } from '../passage/passage-stub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { MetricInterface } from '../metric';
import { MetricsService } from '../metrics.service';
import { MetricsServiceStub } from '../metrics-stub.service';

describe('RsvpComponent', () => {
  let component: RsvpComponent;
  let fixture: ComponentFixture<RsvpComponent>;
  let rsvpService;
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hydrate the rsvp service', () => {
    expect(rsvpService.hydrate).toHaveBeenCalledWith(passageStub);
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
