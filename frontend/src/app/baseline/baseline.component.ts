import { Component, NgZone } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { IntervalService } from '../reader/interval.service';
import { MetricsService } from '../metrics/metrics.service';
import { PassageService } from '../rsvp-utils/passage.service';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { ActivatedRoute } from '@angular/router';
import { InterfaceName } from '../session/InterfaceName';
import { skip } from 'rxjs/operators';

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
    this.rsvpType = InterfaceName.BASELINE;
    this.setupIntervalService();
  }

  playReader() {
    this.didStart = true;
    this.ngZone.runOutsideAngular(() => {
      this.intervalService.runInterval();
    });
  }

  displayPassage = () => {
    return this.didStart && !this.rsvpService.isComplete;
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