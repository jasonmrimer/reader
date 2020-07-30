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
  wpm = 6000;
  textJoiner;
  textMeasurer;
  textElements;

  constructor(
    private ngZone: NgZone,
    private _intervalService: IntervalService,
    private orpService: OrpService,
  ) {
    this._intervalService.blankSlate();
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
    this._intervalService.setInterval(
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
      this._intervalService.runInterval();
    });
  }

  pauseReaderByPunctuation() {
    this._intervalService.pause(
      this.rsvpService.calculatePauseAmount()
    );
  }

  private checkComplete() {
    if (this.rsvpService.isComplete) {
      this._intervalService.clearInterval();
      this._intervalService.setInterval(0, () => {
      });
    }
  }
}
