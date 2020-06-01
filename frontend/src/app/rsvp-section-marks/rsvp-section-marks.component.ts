import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { ReaderService } from '../reader/reader.service';

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
      });
    this.content = this.rsvpService.transformToRSVPWithSections(this.passage.content);
    this.ticks = this.rsvpService.calculateSectionTicks(this.content);
    this.tickPositions = this.calculateTickPositions(this.content);
  }

  calculateTickPositions(content: string[]) {
    let sectionCount = 0;
    let sectionIndexes = content.map((word: string, index: number) => {
      if (word === '#section-marker') {
        sectionCount++;
        return index - (sectionCount - 1);
      }
    }).filter((element) => element !== undefined);
    content = content.filter((word) => word !== '#section-marker');
    return sectionIndexes.map((index: number) => {
      return index * 100 / content.length;
    });
  }
}

