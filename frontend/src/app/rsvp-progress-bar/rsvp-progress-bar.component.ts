import { Component } from '@angular/core';
import { PassageService } from '../passage/passage.service';
import { RsvpContainerComponent } from '../rsvp-container/rsvp-container.component';
import { MetricInterface } from '../metric';

@Component({
  selector: 'app-rsvp-progress-bar',
  templateUrl: './rsvp-progress-bar.component.html',
  styleUrls: ['./rsvp-progress-bar.component.css'],
  providers: [PassageService]
})
export class RsvpProgressBarComponent extends RsvpContainerComponent {
  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_PROGRESS_BAR
  }
}
