import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetricsService } from '../metrics/metrics.service';
import { QuizMetric } from '../metrics/metric';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  metrics: QuizMetric[];

  constructor(
    private router: Router,
    private metricsService: MetricsService
  ) {
    this.metricsService.fetchQuizMetrics().subscribe((metrics) => {
      this.metrics = metrics;
    });
  }

  ngOnInit(): void {
  }

  start() {
    let interfaceName = this.leastUsedInterface(this.metrics);
    this.router.navigate([`/${interfaceName}/1`]);
  }

  leastUsedInterface(metrics: QuizMetric[]) {
    let leastQuizCount = Number.MAX_SAFE_INTEGER;
    let leastUsed: QuizMetric[];

    metrics.map(metric => {
      leastQuizCount = Math.min(metric.quizCount, leastQuizCount);
    });

    leastUsed = metrics.filter(metric => metric.quizCount === leastQuizCount);

    let randomIndex = Math.floor((Math.random() * leastUsed.length) + 1) - 1;
    return leastUsed[randomIndex].interfaceName;
  }
}
