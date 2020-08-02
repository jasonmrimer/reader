import { Component, Input, NgZone, OnInit } from '@angular/core';
import { IntervalService } from './interval.service';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { OrpService } from './orp.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  @Input()
  rsvpService: RSVPService;
  didStart: boolean = false;
  wpm = 250;
  textJoiner;
  textMeasurer;
  textElements;
  displayReader: boolean = true;

  constructor(
    private ngZone: NgZone,
    private intervalService: IntervalService,
    private orpService: OrpService,
  ) {
    this.intervalService.blankSlate();
  }

  ngOnInit() {
    this.assignElementsById();
    this.setupIntervalService();
  }

  private assignElementsById() {
    this.textJoiner = document.getElementById('text-joiner');
    this.textMeasurer = document.getElementById('text-measurer');
    this.textElements = {
      left: document.getElementById('text-left'),
      center: document.getElementById('text-center'),
      right: document.getElementById('text-right')
    };
  }

  private setupIntervalService() {
    this.intervalService.setInterval(
      this.wpm,
      this.playFunctions
    );
  }

  private playFunctions = () => {
    this.ngZone.run(() => {
      this.rsvpService.moveAhead();
      this.orpService.separateAndAlign(
        this.rsvpService.currentWord,
        this.textMeasurer,
        this.textElements,
        this.textJoiner
      );
      this.pauseReaderByPunctuation();
      this.checkComplete();
    });
  }

  playReader() {
    this.didStart = true;
    this.ngZone.runOutsideAngular(() => {
      this.intervalService.runInterval();
    });
  }

  pauseReaderByPunctuation() {
    this.intervalService.pause(
      this.rsvpService.calculatePauseAmount()
    );
  }

  private checkComplete() {
    if (this.rsvpService.isCompleteSubject) {
      document.getElementById('container--reader').remove();
      this.intervalService.clearInterval();
      this.intervalService.setInterval(0, () => {
      });
    }
  }
}
