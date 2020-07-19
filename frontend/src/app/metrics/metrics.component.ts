import { Component, OnInit } from '@angular/core';
import { MetricsService } from './metrics.service';
import { forkJoin } from 'rxjs';

class Row {
  constructor(
    public interfaceName: string,
    public completionCount: number,
    public quizCount: number,
  ) {
  }
}

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent implements OnInit {
  rows: Row[] = [];
  private metricsService: MetricsService;

  constructor(private _metricsService: MetricsService) {
    this.metricsService = _metricsService;
  }

  ngOnInit(): void {
    forkJoin([
      this.metricsService.fetchPassageMetrics(),
      this.metricsService.fetchQuizMetrics()
    ]).subscribe(([passageResults, quizResults]) => {
      const metrics = this.metricsService.mergeMetrics(
          passageResults,
          quizResults
        );
      this.rows = metrics.map(metric => {
        return new Row(
          metric.interfaceName,
          metric.completionCount,
          metric.quizCount
        )
      })
    });
  }

}
