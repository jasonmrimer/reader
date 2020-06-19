import { Component, Input, NgZone, OnInit } from '@angular/core';
import { IntervalService } from './interval.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { RSVPService } from '../rsvp-basic/rsvp.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  content: string[] = [''];
  @Input()
  rsvpService: RSVPService;
  subscription: Subscription;
  rsvpPlayer;

  constructor(private ngZone: NgZone, private _intervalService: IntervalService) {
  }

  ngOnInit() {
    this._intervalService.setInterval(
      1,
      () => {
        this.ngZone.run(() => {
          this.rsvpService.moveAhead();
        })
      }
    );

    this.subscription = this.rsvpService.isComplete$
      .pipe(skip(1))
      .subscribe(this.finishReading);
  }

  private finishReading = () => {
    this._intervalService.clearInterval();
  }

  playReader() {
    this.ngZone.runOutsideAngular(() => {
      this.rsvpPlayer = this._intervalService.runInterval();
    });
  }

  pauseReader() {
    this._intervalService.clearInterval();
  }

  currentWord() {
    return this.content[this.rsvpService.index()];
  }
}
