import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DisplayMetric } from './DisplayMetric';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PassageMetric } from './PassageMetric';
import { QuizMetric } from './QuizMetric';
import { MetricInterfaceName } from './MetricInterfaceName';

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
    return this._http.get<QuizMetric[]>(`${environment.apiUrl}/metrics-quiz`)
      .pipe(
        map(metrics => {
          return MetricsService.presetAllInterfacesForQuiz(metrics);
        })
      )
  }

  private static presetAllInterfacesForQuiz(metrics: QuizMetric[]) {
    let blankMetrics: QuizMetric[] = [
      new QuizMetric(MetricInterfaceName.BASELINE, 0),
      new QuizMetric(MetricInterfaceName.RSVP_BASIC, 0),
      new QuizMetric(MetricInterfaceName.RSVP_SUBWAY, 0),
      new QuizMetric(MetricInterfaceName.RSVP_SECTION_MARK, 0),
      new QuizMetric(MetricInterfaceName.RSVP_PROGRESS_BAR, 0),
    ];
    metrics.map(metric => {
      let matchingMetric = blankMetrics.find(m => m.interfaceName === metric.interfaceName);
      matchingMetric.quizCount = metric.quizCount;
    })
    return blankMetrics;
  }

  postPassageCompletion(metricInterface: MetricInterfaceName) {
    return this._http.post(
      `${environment.apiUrl}/metrics-passage`,
      {interfaceName: metricInterface}
    )
  }

  mergeMetrics(passageMetrics: PassageMetric[], quizMetrics: QuizMetric[]): DisplayMetric[] {
    let metrics = passageMetrics.map(metric => {
      return new DisplayMetric(metric.interfaceName, metric.completionCount, -1);
    });
    quizMetrics.map(qm => {
      if (metrics.find(m => m.interfaceName === qm.interfaceName)) {
        metrics.find(m => m.interfaceName === qm.interfaceName).quizCount = qm.quizCount;
      }
    })
    return metrics;
  }
}
