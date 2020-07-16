import { Component } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';

@Component({
  selector: 'app-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.css'],
})
export class BaselineComponent extends RsvpComponent {
  didStart: boolean = false;

  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_BASIC;
  }

  start() {
    this.didStart = true;
  }

}
