import { Component } from '@angular/core';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { PassageService } from '../rsvp-utils/passage.service';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';

@Component({
  selector: 'app-rsvp-section-marks',
  templateUrl: './rsvp-section-marks.component.html',
  styleUrls: ['./rsvp-section-marks.component.css'],
  providers: [PassageService, RSVPService]
})
export class RsvpSectionMarksComponent extends RsvpComponent {
  ngOnInit(): void {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_SECTION_MARK;
  }
}
