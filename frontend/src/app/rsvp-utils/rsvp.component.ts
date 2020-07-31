import { Component, OnInit } from '@angular/core';
import { PassageService } from './passage.service';
import { RSVPService } from './rsvp.service';
import { skip } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InterfaceName } from '../session/InterfaceName';
import { MetricsService } from '../metrics/metrics.service';

@Component({
  selector: 'app-rsvp-component',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {
  rsvpType: InterfaceName;
  protected subscription: Subscription;
  private passageId: number;

  constructor(
    private metricsService: MetricsService,
    private passageService: PassageService,
    public rsvpService: RSVPService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.passageId = parseInt(params.get('passageId'));
    });

    this.passageService
      .getPassage(this.passageId)
      .subscribe(passage => {
        this.rsvpService.hydrate(
          passage,
          this.rsvpType
        );
        this.subscription = this.rsvpService.isComplete$
          .subscribe(() => {
            this.postMetric();
          });
      })

  }

  private postMetric = () => {
    this.metricsService.postPassageCompletion(this.rsvpType)
      .subscribe();
    this.subscription.unsubscribe();
  }
}
