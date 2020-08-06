import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpProgressBarComponent } from './rsvp-progress-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReaderComponent } from '../reader/reader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { PassageService } from '../rsvp-utils/passage.service';
import { PassageServiceStub } from '../rsvp-utils/passage-stub.service';
import { passageStub } from '../rsvp-utils/PassageStub';
import { RouterTestingModule } from '@angular/router/testing';
import { InterfaceName } from '../session/InterfaceName';

describe('RSVPProgressBarComponent', () => {
  let component: RsvpProgressBarComponent;
  let fixture: ComponentFixture<RsvpProgressBarComponent>;
  let rsvpService: RSVPService;

  beforeEach(async(() => {
    rsvpService = new RSVPService();
    rsvpService.hydrate(passageStub, InterfaceName.RSVP_BASIC);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatProgressBarModule,
        RouterTestingModule
      ],
      declarations: [
        RsvpProgressBarComponent,
        ReaderComponent,
      ],
      providers: [
        {provide: PassageService, useValue: new PassageServiceStub()},
        {provide: RSVPService, useValue: rsvpService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async () => {
    await expect(component).toBeTruthy();
  });

  it('should have a progress bar', async () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const completionMeter = fixture.debugElement.query(By.css('.progress-bar'));
      expect(completionMeter).toBeTruthy();
      expect(completionMeter.attributes['aria-valuenow']).toBe('0');
    });
  });
});
