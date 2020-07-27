import { Component } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { InterfaceName } from '../session/InterfaceName';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './rsvp-basic.component.html',
  styleUrls: ['./rsvp-basic.component.css'],
})
export class RsvpBasicComponent extends RsvpComponent {
  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = InterfaceName.RSVP_BASIC;
  }
}
