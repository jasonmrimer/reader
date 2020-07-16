import { Component, NgZone } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';
import { IntervalService } from '../reader/interval.service';
import { MetricsService } from '../metrics/metrics.service';
import { PassageService } from '../rsvp-utils/passage.service';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.css'],
})
export class BaselineComponent extends RsvpComponent {
  didStart: boolean = false;
  wpm = 250;

  constructor(
    metricsService: MetricsService,
    passageService: PassageService,
    rsvpService: RSVPService,
    route: ActivatedRoute,
    private intervalService: IntervalService,
    private ngZone: NgZone,
  ) {
    super(
      metricsService,
      passageService,
      rsvpService,
      route
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_BASIC;
    this.setupIntervalService();
  }

  start() {
    this.didStart = true;
  }

  playReader() {
    this.ngZone.runOutsideAngular(() => {
      this.intervalService.runInterval();
    });
  }

  private setupIntervalService() {
    this.intervalService.setInterval(
      this.wpm,
      () => {
        this.ngZone.run(() => {
          this.rsvpService.moveAhead();
          this.pauseReaderByPunctuation();
        })
      }
    );
  }

  pauseReaderByPunctuation() {
    let pauseIncrement = this.rsvpService.calculatePause();
    if (pauseIncrement > 0) {
      this.intervalService.clearInterval();
      setTimeout(() => {
        this.playReader();
      }, pauseIncrement);
    }
  }
}
