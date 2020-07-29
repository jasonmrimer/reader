import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsService } from '../metrics/metrics.service';
import { QuizMetric } from '../metrics/QuizMetric';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
  }

  start() {
    this.sessionService.generateSessionPair().subscribe((pair) => {
      this.router.navigate([`/${pair.interfaceName}/1`]);
    })
  }
}
