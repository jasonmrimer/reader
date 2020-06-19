import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpContainerComponent } from './rsvp-container.component';
import { passageStub } from '../rsvp-basic/PassageStub';
import { PassageService } from '../passage/passage.service';
import { PassageServiceStub } from '../passage/passage-stub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RSVPServiceStub } from '../rsvp-basic/rsvp-stub.service';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { MetricInterface } from '../metric';
import { MetricsService } from '../metrics.service';
import { MetricsServiceStub } from '../metrics-stub.service';

describe('RsvpContainerComponent', () => {
  let component: RsvpContainerComponent;
  let fixture: ComponentFixture<RsvpContainerComponent>;

  beforeEach(async(() => {
    let passageService = new PassageServiceStub();
    let rsvpService = new RSVPServiceStub();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RsvpContainerComponent],
      providers: [
        {provide: PassageService, useValue: passageService},
        {provide: RSVPService, useValue: rsvpService},
        {provide: MetricsService, useValue: new MetricsServiceStub()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpContainerComponent);
    component = fixture.componentInstance;
    component.rsvpType = MetricInterface.RSVP_BASIC;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hydrate the rsvp service', () => {
    expect(component.rsvpService.hydrate).toHaveBeenCalledWith(passageStub);
  });

  it('should fire a metrics post on passage complete', () => {
    component.metricsService.postPassageCompletion = jasmine.createSpy();
    component.rsvpService.contentLength = 2;
    expect(component.rsvpService.isComplete).toBeFalsy();
    component.rsvpService.moveAhead();
    component.rsvpService.moveAhead();
    expect(component.rsvpService.isComplete).toBeTrue();
    expect(component.metricsService.postPassageCompletion).toHaveBeenCalledWith(MetricInterface.RSVP_BASIC);
  });

});
