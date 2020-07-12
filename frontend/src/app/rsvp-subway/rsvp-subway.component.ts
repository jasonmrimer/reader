import { Component } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';

@Component({
  selector: 'app-rsvp-subway',
  templateUrl: './rsvp-subway.component.html',
  styleUrls: ['./rsvp-subway.component.css']
})
export class RsvpSubwayComponent extends RsvpComponent {
  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_SUBWAY;
  }
}
