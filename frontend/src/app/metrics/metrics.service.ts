import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DisplayMetric } from './DisplayMetric';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PassageMetric } from './PassageMetric';
import { QuizMetric } from './QuizMetric';
import { AllInterfaces, InterfaceName } from '../session/InterfaceName';

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

  private static presetAllInterfacesForQuiz(fetchedMetrics: QuizMetric[]) {
    let quizMetrics: QuizMetric[] = AllInterfaces.map((interfaceName: InterfaceName) => {
      return new QuizMetric(interfaceName, 0);
    });
    fetchedMetrics.map(metric => {
      let matchingMetric = quizMetrics.find(m => m.interfaceName === metric.interfaceName);
      matchingMetric.quizCount = metric.quizCount;
    })
    return quizMetrics;
  }

  postPassageCompletion(metricInterface: InterfaceName) {
    return this._http.post(
      `${environment.apiUrl}/metrics-passage`,
      {interfaceName: metricInterface}
    )
  }

  mergeMetrics(passageMetrics: PassageMetric[], quizMetrics: QuizMetric[]): DisplayMetric[] {
    let displayMetrics: DisplayMetric[] = AllInterfaces.map((interfaceName: InterfaceName) => {
      return new DisplayMetric(interfaceName, 0, 0);
    });

    displayMetrics.map((displayMetric) => {
      let matchingMetric = passageMetrics.find(metric => metric.interfaceName === displayMetric.interfaceName);
      displayMetric.completionCount = matchingMetric ? matchingMetric.completionCount : 0;
    })

    displayMetrics.map((displayMetric) => {
      let matchingMetric = quizMetrics.find(metric => metric.interfaceName === displayMetric.interfaceName);
      displayMetric.quizCount = matchingMetric ? matchingMetric.quizCount : 0;
    })

    return displayMetrics;
  }
}
