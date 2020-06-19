import { Component } from '@angular/core';
import { MetricInterface } from '../metric';
import { RsvpContainerComponent } from '../rsvp-container/rsvp-container.component';
import { PassageService } from '../passage/passage.service';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './rsvp-basic.component.html',
  styleUrls: ['./rsvp-basic.component.css'],
  providers: [PassageService]
})
export class RsvpBasicComponent extends RsvpContainerComponent {
  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_BASIC;
  }
}
