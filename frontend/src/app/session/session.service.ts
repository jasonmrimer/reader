import { Injectable } from '@angular/core';
import { AllInterfaces, InterfaceName } from './InterfaceName';
import { AllPassages, PassageName } from './PassageName';
import { SessionPair } from './SessionPair';
import { MetricsService } from '../metrics/metrics.service';
import { flatMap } from 'rxjs/operators';
import { QuizMetric } from '../metrics/QuizMetric';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _sessionId: string;
  private _availableInterfaces: InterfaceName[];
  private _availablePassages: PassageName[];
  private _metricsService: MetricsService;

  constructor() {
  }

  hydrate(metricsService: MetricsService) {
    this._sessionId = `${Date.now()}${Math.random()}`
    this._availableInterfaces = [...AllInterfaces];
    this._availablePassages = [...AllPassages];
    this._metricsService = metricsService;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  get availableInterfaces(): InterfaceName[] {
    return this._availableInterfaces;
  }

  get availablePassages(): PassageName[] {
    return this._availablePassages;
  }

  generateSessionPair = (): Observable<SessionPair> => {
    return this._metricsService.fetchQuizMetrics().pipe(
      flatMap(quizMetrics => {
        return of(new SessionPair(
          this.getRandomLeastUsedAvailableInterface(quizMetrics),
          this.getRandomAvailablePassage(this._availablePassages)
        ));
      })
    )
  };

  getRandomLeastUsedAvailableInterface = (quizMetrics: QuizMetric[]) => {
    let leastUsed = SessionService.leastUsed(quizMetrics);
    leastUsed = leastUsed.filter(qm => this._availableInterfaces.includes(qm.interfaceName));
    return this.randomNameFrom(leastUsed);
  }

  getRandomLeastInterface = (quizMetrics: QuizMetric[]) =>
    this.randomNameFrom(
      SessionService.leastUsed(quizMetrics)
    )

  private static leastUsed(quizMetrics: QuizMetric[]): QuizMetric[] {
    let minQuizCount = SessionService.findMin(quizMetrics);
    return quizMetrics.filter(metric => metric.quizCount === minQuizCount);
  }

  private static findMin = (metrics: QuizMetric[]) => {
    let min = Number.MAX_SAFE_INTEGER;
    metrics.map(metric => {
      min = Math.min(metric.quizCount, min);
    });
    return min;
  };

  private randomNameFrom = (metrics) => {
    return metrics[this.randomIndex(metrics)].interfaceName
  }

  private randomIndex = (array) => {
    return Math.floor((Math.random() * array.length) + 1) - 1
  }

  private getRandomAvailablePassage(availablePassages: PassageName[]) {
    return availablePassages[this.randomIndex(availablePassages)];
  }

  makeSessionPairUnavailable(sessionPair: SessionPair) {
    this._availableInterfaces = this._availableInterfaces.filter((interfaceName) => {
      return interfaceName !== sessionPair.interfaceName;
    })

    this._availablePassages = this._availablePassages.filter((passageName) => {
      return passageName !== sessionPair.passageName;
    })
  }
}

