import { Component, Input, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { ReaderService } from '../reader/reader.service';

@Component({
  selector: 'app-rsvp-section-marks',
  templateUrl: './rsvp-section-marks.component.html',
  styleUrls: ['./rsvp-section-marks.component.css'],
  providers: [RSVPService, ReaderService]
})
export class RsvpSectionMarksComponent implements OnInit {
  passage: Passage = new Passage();
  content: string[] = [''];
  tickPositions: number[];
  ticks: number[];
  readerService: ReaderService;

  constructor(private rsvpService: RSVPService, private _readerService: ReaderService) {
    this.readerService = _readerService;
  }

  ngOnInit(): void {
    this.rsvpService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        let contentWithMarkers = this.rsvpService.transformToRSVPWithSections(this.passage.content);
        this.ticks = this.rsvpService.calculateSectionTicks(contentWithMarkers);
        this.tickPositions = this.rsvpService.calculateTickPositions(contentWithMarkers);
        this.content = this.rsvpService.transformToRSVPWithoutSections(this.passage.content);
      });
  }
}

