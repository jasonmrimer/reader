import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from './rsvp.service';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './rsvp-basic.component.html',
  styleUrls: ['./rsvp-basic.component.css'],
  providers: [RSVPService]
})
export class RsvpBasicComponent implements OnInit {
  passage: Passage = new Passage();
  readerContent: string[] = [''];

  constructor(private _rsvpService: RSVPService) {
  }

  ngOnInit() {
    this._rsvpService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.readerContent = this._rsvpService.transformToRSVP(this.passage.content);
      });
  }
}
