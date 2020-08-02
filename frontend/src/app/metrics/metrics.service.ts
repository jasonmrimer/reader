import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DisplayMetric } from './DisplayMetric';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PassageMetric } from './PassageMetric';
import { QuizMetric } from './QuizMetric';
import { AllInterfaces, InterfaceName } from '../session/InterfaceName';
import { CompletionCount } from './CompletionCount';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private _http: HttpClient) {
  }

  fetchCompletionMetrics(): Observable<CompletionCount[]> {
    return this._http.get<CompletionCount[]>(`${environment.apiUrl}/metrics-passage`)
      .pipe(
        map(metrics => {
          return MetricsService.deserializeCompletionCount(metrics);
        })
      );
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

  private static presetAllInterfacesForCompletion() {
    return AllInterfaces.map((interfaceName: InterfaceName) => {
      return new CompletionCount(interfaceName, 0);
    });
  }

  postPassageCompletion(metricInterface: InterfaceName, user: string) {

    return this._http.post(
      `${environment.apiUrl}/metrics-passage`,
      {
        interfaceName: metricInterface,
        date: new Date(),
        user: user
      }
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

  mergeMetricsV2(
    completionCounts: CompletionCount[],
    quizMetrics: QuizMetric[]
  ): DisplayMetric[] {
    let displayMetrics = MetricsService.presetDisplayMetrics();

    displayMetrics.map((displayMetric) => {
      let matchingCompletionMetric = MetricsService.getMatchingMetric(completionCounts, displayMetric);
      let matchingQuizMetric = MetricsService.getMatchingMetric(quizMetrics, displayMetric);

      displayMetric.completionCount = matchingCompletionMetric ? matchingCompletionMetric.count : 0;
      displayMetric.quizCount = matchingQuizMetric ? matchingQuizMetric.quizCount : 0;
    })

    return displayMetrics;
  }

  private static getMatchingMetric(metricsWithInterfaceName: any[], displayMetric: DisplayMetric) {
    return metricsWithInterfaceName.find(metric => metric.interfaceName === displayMetric.interfaceName);
  }

  private static presetDisplayMetrics() {
    return AllInterfaces.map((interfaceName: InterfaceName) => {
      return new DisplayMetric(interfaceName, 0, 0);
    });
  }

  private static deserializeCompletionCount(metrics: any[]): CompletionCount[] {
    let fetchedCounts = metrics.map(metric => {
      return new CompletionCount(metric._id, metric.count);
    });

    let allCounts = this.presetAllInterfacesForCompletion();
    allCounts.map(count => {
      let match = fetchedCounts.find(m => m.interfaceName === count.interfaceName);
      if (match) {
        count.count = match.count;
      }
    });
    return allCounts;
  }
}
