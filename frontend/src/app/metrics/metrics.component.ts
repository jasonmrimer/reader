import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../metrics.service';
import { Metric } from '../metric';

class Row {
  constructor(
    public interfaceName: string,
    public completionCount: number
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
    this.metricsService.fetchMetrics()
      .subscribe((metrics: Metric[]) => {
          metrics.map((metric) => {
            this.rows.push(new Row(metric.interfaceName, metric.completionCount))
          })
        }
      )
  }

}
