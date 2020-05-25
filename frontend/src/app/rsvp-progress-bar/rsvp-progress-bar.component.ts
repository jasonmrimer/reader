import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from '../rsvp-basic/rsvp.service';

@Component({
  selector: 'app-rsvp-progress-bar',
  templateUrl: './rsvp-progress-bar.component.html',
  styleUrls: ['./rsvp-progress-bar.component.css']
})
export class RsvpProgressBarComponent implements OnInit {
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
