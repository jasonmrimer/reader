import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Passage } from './passage';
import { PassageService } from './passage.service';
import { RSVPService } from './rsvp.service';
import { MetricsService } from '../metrics/metrics.service';
import { MetricInterface } from '../metrics/metric';
import { skip } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp-component',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {
  rsvpType: MetricInterface;
  private subscription: Subscription;

  constructor(
    private metricsService: MetricsService,
    private passageService: PassageService,
    public rsvpService: RSVPService
  ) {
  }

  ngOnInit() {
    this.passageService
      .getPassages()
      .subscribe(passages => {
        this.rsvpService.hydrate(passages[0]);
      })

    this.subscription = this.rsvpService.isComplete$
      .pipe(skip(1))
      .subscribe(this.postMetric);
  }

  private postMetric = () => {
    this.metricsService.postPassageCompletion(this.rsvpType)
      .subscribe();
    this.subscription.unsubscribe();
  }
}