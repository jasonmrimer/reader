import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from '../rsvp-basic/rsvp.service';

@Component({
  selector: 'app-rsvp-section-marks',
  templateUrl: './rsvp-section-marks.component.html',
  styleUrls: ['./rsvp-section-marks.component.css'],
  providers: [RSVPService]
})
export class RsvpSectionMarksComponent implements OnInit {
  passage: Passage;
  content: string[];
  tickPositions: number[];
  ticks: number[];

  constructor(private rsvpService: RSVPService) {
  }

  ngOnInit(): void {
    this.rsvpService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.content = this.rsvpService.transformToRSVPWithSections(this.passage.content);
        this.ticks = this.rsvpService.calculateSectionTicks(this.content);
        this.tickPositions = this.rsvpService.calculateTickPositions(this.content);
      });
  }
}

