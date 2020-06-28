import { Injectable } from '@angular/core';
import { MetricsService } from './metrics.service';
import { Observable, of } from 'rxjs';
import { Metric, PassageMetric, passageMetricsStub, QuizMetric, quizMetricsStub } from './metric';

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
    return of(quizMetricsStub);
  }
}
