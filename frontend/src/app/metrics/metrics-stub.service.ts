import { Injectable } from '@angular/core';
import { MetricsService } from './metrics.service';
import { Observable, of } from 'rxjs';
import { PassageMetric } from './PassageMetric';
import { QuizMetric } from './QuizMetric';
import { passageMetricsStub } from './PassageMetricStub';
import { QuizMetricsStub } from './QuizMetricStub';

@Injectable({
  providedIn: 'root'
})
export class MetricsServiceStub extends MetricsService {
  constructor() {
    super(null);
  }
  fetchPassageMetrics(): Observable<PassageMetric[]> {
    return of(passageMetricsStub);
  }
  fetchQuizMetrics(): Observable<QuizMetric[]> {
    return of(QuizMetricsStub());
  }
}
