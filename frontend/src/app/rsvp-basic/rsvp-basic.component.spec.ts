import { RsvpProgressBarComponent } from '../rsvp-progress-bar/rsvp-progress-bar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReaderComponent } from '../reader/reader.component';
import { RSVPService } from './rsvp.service';
import { RsvpBasicComponent } from './rsvp-basic.component';
import { PassageService } from '../passage/passage.service';
import { PassageServiceStub } from '../passage/passage-stub.service';
import { ReaderService } from '../reader/reader.service';
import { MetricsService } from '../metrics.service';
import { MetricsServiceStub } from '../metrics-stub.service';
import { MetricInterface } from '../metric';

describe('RSVPBasicComponent', () => {
  let component: RsvpBasicComponent;
  let fixture: ComponentFixture<RsvpBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        RsvpProgressBarComponent,
        ReaderComponent,
      ],
      providers: [
        RSVPService,
        {provide: PassageService, useValue: new PassageServiceStub()},
        {provide: MetricsService, useValue: new MetricsServiceStub()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should control an reader component', () => {
    expect(fixture.nativeElement.querySelector('app-reader')).not.toBe(null);
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
