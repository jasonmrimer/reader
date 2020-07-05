import { Component, Input, NgZone, OnInit } from '@angular/core';
import { IntervalService } from './interval.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  @Input()
  rsvpService: RSVPService;
  subscription: Subscription;
  rsvpPlayer;
  wpm = 250;

  constructor(
    private ngZone: NgZone,
    private _intervalService: IntervalService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this._intervalService.setInterval(
      this.calculatePace(),
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

  private calculatePace() {
    let millisecondsPerMinute = 60000;
    return millisecondsPerMinute / this.wpm;
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

  takeQuiz() {
    this.router.navigate(['/quiz', this.rsvpService.quizRoute]);
  }
}
