import { Component } from '@angular/core';
import { MetricInterface } from '../metrics/metric';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './rsvp-basic.component.html',
  styleUrls: ['./rsvp-basic.component.css'],
})
export class RsvpBasicComponent extends RsvpComponent {
  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_BASIC;
  }
}
