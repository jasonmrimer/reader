import { Component } from '@angular/core';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { PassageService } from '../passage/passage.service';
import { RsvpContainerComponent } from '../rsvp-container/rsvp-container.component';
import { MetricInterface } from '../metric';

@Component({
  selector: 'app-rsvp-section-marks',
  templateUrl: './rsvp-section-marks.component.html',
  styleUrls: ['./rsvp-section-marks.component.css'],
  providers: [PassageService, RSVPService]
})
export class RsvpSectionMarksComponent extends RsvpContainerComponent {
  ngOnInit(): void {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_SECTION_MARK;
  }
}
