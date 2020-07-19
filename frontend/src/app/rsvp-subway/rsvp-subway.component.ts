import { Component } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { InterfaceName } from '../session/InterfaceName';

@Component({
  selector: 'app-rsvp-subway',
  templateUrl: './rsvp-subway.component.html',
  styleUrls: ['./rsvp-subway.component.css']
})
export class RsvpSubwayComponent extends RsvpComponent {
  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = InterfaceName.RSVP_SUBWAY;
  }
}
