import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuizMetric } from './QuizMetric';
import { QuizMetricsFullStub } from './QuizMetricStub';
import { MetricsService } from './metrics.service';
import { completionCountsStub } from './CompletionCountStub';
import { CompletionCount } from './CompletionCount';

@Injectable({
  providedIn: 'root'
})
export class MetricsServiceStub extends MetricsService {
  constructor() {
    super(null);
  }

  fetchQuizMetrics(): Observable<QuizMetric[]> {
    return of(QuizMetricsFullStub);
  }

  fetchCompletionMetrics(): Observable<CompletionCount[]> {
    return of(completionCountsStub);
  }
}
