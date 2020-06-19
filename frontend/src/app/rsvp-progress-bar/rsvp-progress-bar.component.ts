import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { PassageService } from '../passage/passage.service';

@Component({
  selector: 'app-rsvp-progress-bar',
  templateUrl: './rsvp-progress-bar.component.html',
  styleUrls: ['./rsvp-progress-bar.component.css'],
  providers: [PassageService, RSVPService]
})
export class RsvpProgressBarComponent implements OnInit {
  passage: Passage = new Passage();
  readerContent: string[] = [''];
  rsvpService: RSVPService;

  constructor(
    private passageService: PassageService,
    private _rsvpService: RSVPService,
  ) {
    this.rsvpService = _rsvpService;
  }

  ngOnInit() {
    this.passageService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.readerContent = this._rsvpService.transformToReadableContent(this.passage.content);
        this.rsvpService.contentLength = this.readerContent.length;
      });
  }
}
