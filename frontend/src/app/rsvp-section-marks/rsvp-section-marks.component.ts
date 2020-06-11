import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { ReaderService } from '../reader/reader.service';
import { PassageService } from '../passage/passage.service';

@Component({
  selector: 'app-rsvp-section-marks',
  templateUrl: './rsvp-section-marks.component.html',
  styleUrls: ['./rsvp-section-marks.component.css'],
  providers: [PassageService, ReaderService, RSVPService]
})
export class RsvpSectionMarksComponent implements OnInit {
  passage: Passage = new Passage();
  content: string[] = [''];
  tickPositions: number[];
  ticks: number[];
  readerService: ReaderService;

  constructor(
    private passageService: PassageService,
    private rsvpService: RSVPService,
    private _readerService: ReaderService
  ) {
    this.readerService = _readerService;
  }

  ngOnInit(): void {
    this.passageService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.content = this.rsvpService.transformToReadableContent(this.passage.content);
        let contentWithMarkers = this.rsvpService.transformToRSVPWithSectionMarkers(this.passage.content);
        this.ticks = this.rsvpService.calculateSectionMarkerIndexes(contentWithMarkers);
        this.tickPositions = this.rsvpService.calculateRelativePositionsOfIndexes(
          this.ticks,
          this.content.length
        );
      });
  }
}
