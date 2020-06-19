import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Passage } from '../passage/passage';
import { PassageService } from '../passage/passage.service';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { MetricsService } from '../metrics.service';
import { MetricInterface } from '../metric';
import { skip } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rsvp-container',
  templateUrl: './rsvp-container.component.html',
  styleUrls: ['./rsvp-container.component.css'],
})
export class RsvpContainerComponent implements OnInit {
  passage: Passage;
  @Input() rsvpType: MetricInterface;
  private subscription: Subscription;

  constructor(
    private passageService: PassageService,
    public rsvpService: RSVPService,
    public metricsService: MetricsService
  ) {

  }

  ngOnInit() {
    this.passageService
      .getPassages()
      .subscribe(passages => {
        this.rsvpService.hydrate(passages[0]);
        this.passage = passages[0];
      })

    this.subscription = this.rsvpService.isComplete$
      .pipe(skip(1))
      .subscribe(this.postMetric);
  }

  private postMetric = () => {
    this.metricsService.postPassageCompletion(MetricInterface.RSVP_BASIC)
      .subscribe();
    this.subscription.unsubscribe();
  }
}
