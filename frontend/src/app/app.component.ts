import { Component, OnInit } from '@angular/core';
import { SessionService } from './session/session.service';
import { MetricsService } from './metrics/metrics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reader';

  constructor(
    private sessionService: SessionService,
    private metricsService: MetricsService
  ) {
  }

  ngOnInit(): void {
    this.sessionService.hydrate(this.metricsService);
  }
}
