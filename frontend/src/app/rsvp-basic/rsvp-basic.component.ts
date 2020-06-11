import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from './rsvp.service';
import { ReaderService } from '../reader/reader.service';
import { PassageService } from '../passage/passage.service';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './rsvp-basic.component.html',
  styleUrls: ['./rsvp-basic.component.css'],
  providers: [PassageService, RSVPService, ReaderService]
})
export class RsvpBasicComponent implements OnInit {
  passage: Passage = new Passage();
  readerContent: string[] = [''];

  constructor(
    private passageService: PassageService,
    private rsvpService: RSVPService,
    public readerService: ReaderService
  ) {
  }

  ngOnInit() {
    this.passageService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.readerContent = this.rsvpService
          .transformToReadableContent(this.passage.content);
      });
  }
}
