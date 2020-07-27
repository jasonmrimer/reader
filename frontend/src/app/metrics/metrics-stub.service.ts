import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PassageMetric } from './PassageMetric';
import { QuizMetric } from './QuizMetric';
import { passageMetricsStub } from './PassageMetricStub';
import { QuizMetricsFullStub, QuizMetricsPartialStub } from './QuizMetricStub';
import { MetricsService } from './metrics.service';

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
    return of(QuizMetricsFullStub);
  }
}
