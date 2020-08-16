import { Component, OnInit } from '@angular/core';
import { SessionService } from './session/session.service';
import { MetricsService } from './metrics/metrics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reader';

  constructor(
    private sessionService: SessionService,
    private metricsService: MetricsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sessionService.hydrate(this.metricsService, this.router);
  }
}
