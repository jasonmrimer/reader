import { Component } from '@angular/core';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { PassageService } from '../rsvp-utils/passage.service';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { InterfaceName } from '../session/InterfaceName';
import {Options} from 'ng5-slider';

@Component({
  selector: 'app-rsvp-section-marks',
  templateUrl: './rsvp-section-marks.component.html',
  styleUrls: ['./rsvp-section-marks.component.css'],
  providers: [PassageService, RSVPService]
})
export class RsvpSectionMarksComponent extends RsvpComponent {
  style =
    '.slider-track {background: pink}'
    ;
  options: Options = {
    floor: 0,
    ceil: this.rsvpService.contentLength,
    ticksArray: this.rsvpService.sectionMarkerIndexes
  };

  ngOnInit(): void {
    super.ngOnInit();
    this.rsvpType = InterfaceName.RSVP_SECTION_MARK;
  }

}
