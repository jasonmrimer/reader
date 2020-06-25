import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Metric, MetricInterface, PassageMetric, QuizMetric } from './metric';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private _http: HttpClient) {
  }

  fetchPassageMetrics(): Observable<PassageMetric[]> {
    return this._http.get<PassageMetric[]>(`${environment.apiUrl}/metrics-passage`);
  }

  fetchQuizMetrics(): Observable<QuizMetric[]> {
    return this._http.get<QuizMetric[]>(`${environment.apiUrl}/metrics-quiz`);
  }

  postPassageCompletion(metricInterface: MetricInterface) {
    return this._http.post(
      `${environment.apiUrl}/metrics-passage`,
      {interfaceName: metricInterface}
    )
  }

  mergeMetrics(passageMetrics: PassageMetric[], quizMetrics: QuizMetric[]): Metric[] {
    let metrics = passageMetrics.map(metric => {
      return new Metric(metric.interfaceName, metric.completionCount, -1);
    });
    quizMetrics.map(qm => {
      if (metrics.find(m => m.interfaceName === qm.interfaceName)) {
        metrics.find(m => m.interfaceName === qm.interfaceName).quizCount = qm.quizCount;
      }
    })
    return metrics;
  }
}
