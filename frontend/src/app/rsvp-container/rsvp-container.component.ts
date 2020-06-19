import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { PassageService } from '../passage/passage.service';
import { RSVPService } from '../rsvp-basic/rsvp.service';

@Component({
  selector: 'app-rsvp-container',
  templateUrl: './rsvp-container.component.html',
  styleUrls: ['./rsvp-container.component.css'],
})
export class RsvpContainerComponent implements OnInit {
  passage: Passage;

  constructor(
    private passageService: PassageService,
    public rsvpService: RSVPService
  ) {

  }

  ngOnInit() {
    this.passageService
      .getPassages()
      .subscribe(passages => {
        this.rsvpService.hydrate(passages[0]);
        this.passage = passages[0];
      })
  }

}
