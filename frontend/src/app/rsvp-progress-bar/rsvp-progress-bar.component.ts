import { Component } from '@angular/core';
import { PassageService } from '../rsvp-utils/passage.service';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';

@Component({
  selector: 'app-rsvp-progress-bar',
  templateUrl: './rsvp-progress-bar.component.html',
  styleUrls: ['./rsvp-progress-bar.component.css'],
  providers: [PassageService]
})
export class RsvpProgressBarComponent extends RsvpComponent {
  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_PROGRESS_BAR;
  }
}
