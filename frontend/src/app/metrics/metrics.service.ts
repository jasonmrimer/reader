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
import { User } from '../session/User';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private _http: HttpClient) {
  }

  private static presetAllInterfacesForQuiz(fetchedMetrics: QuizMetric[]) {
    const quizMetrics: QuizMetric[] = AllInterfaces.map((interfaceName: InterfaceName) => {
      return new QuizMetric(interfaceName, 0);
    });
    fetchedMetrics.map(metric => {
      const matchingMetric = quizMetrics.find(m => m.interfaceName === metric.interfaceName);
      matchingMetric.quizCount = metric.quizCount;
    });
    return quizMetrics;
  }

  private static presetAllInterfacesForCompletion() {
    return AllInterfaces.map((interfaceName: InterfaceName) => {
      return new CompletionCount(interfaceName, 0);
    });
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
    const fetchedCounts = metrics.map(metric => {
      return new CompletionCount(metric._id, metric.count);
    });

    const allCounts = this.presetAllInterfacesForCompletion();
    allCounts.map(count => {
      const match = fetchedCounts.find(m => m.interfaceName === count.interfaceName);
      if (match) {
        count.count = match.count;
      }
    });
    return allCounts;
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
      );
  }

  postPassageCompletion(metricInterface: InterfaceName, user: User) {
    return this._http.post(
      `${environment.apiUrl}/metrics-passage`,
      {
        interfaceName: metricInterface,
        date: new Date(),
        user: user
      }
    );
  }

  mergeMetrics(passageMetrics: PassageMetric[], quizMetrics: QuizMetric[]): DisplayMetric[] {
    const displayMetrics: DisplayMetric[] = AllInterfaces.map((interfaceName: InterfaceName) => {
      return new DisplayMetric(interfaceName, 0, 0);
    });

    displayMetrics.map((displayMetric) => {
      const matchingMetric = passageMetrics.find(metric => metric.interfaceName === displayMetric.interfaceName);
      displayMetric.completionCount = matchingMetric ? matchingMetric.completionCount : 0;
    });

    displayMetrics.map((displayMetric) => {
      const matchingMetric = quizMetrics.find(metric => metric.interfaceName === displayMetric.interfaceName);
      displayMetric.quizCount = matchingMetric ? matchingMetric.quizCount : 0;
    });

    return displayMetrics;
  }

  mergeMetricsV2(
    completionCounts: CompletionCount[],
    quizMetrics: QuizMetric[]
  ): DisplayMetric[] {
    const displayMetrics = MetricsService.presetDisplayMetrics();

    displayMetrics.map((displayMetric) => {
      const matchingCompletionMetric = MetricsService.getMatchingMetric(completionCounts, displayMetric);
      const matchingQuizMetric = MetricsService.getMatchingMetric(quizMetrics, displayMetric);

      displayMetric.completionCount = matchingCompletionMetric ? matchingCompletionMetric.count : 0;
      displayMetric.quizCount = matchingQuizMetric ? matchingQuizMetric.quizCount : 0;
    });

    return displayMetrics;
  }

  saveUser(user: User) {
    return this._http.post(
      `${environment.apiUrl}/user`,
      user
    );
  }
}
