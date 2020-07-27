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
  metrics: QuizMetric[];

  constructor(
    private router: Router,
    private metricsService: MetricsService,
    private sessionService: SessionService
  ) {
    this.metricsService.fetchQuizMetrics().subscribe((metrics) => {
      this.metrics = metrics;
    });
  }

  ngOnInit(): void {
  }

  start() {
    let interfaceName = this.randomLeastUsedInterface(this.metrics);
    this.router.navigate([`/${interfaceName}/1`]);
  }

  randomLeastUsedInterface(metrics: QuizMetric[]) {
    let minQuizCount = this.findMin(metrics);
    let leastUsedMetrics = metrics.filter(metric => metric.quizCount === minQuizCount);
    return this.randomNameFrom(leastUsedMetrics);
  }

  private randomNameFrom = (metrics) => {
    return metrics[this.randomIndex(metrics)].interfaceName
  }

  private findMin = (metrics: QuizMetric[]) => {
    let min = Number.MAX_SAFE_INTEGER;
    metrics.map(metric => {
      min = Math.min(metric.quizCount, min);
    });
    return min;
  };

  private randomIndex = (leastUsed) => {
    return Math.floor((Math.random() * leastUsed.length) + 1) - 1
  }
}
