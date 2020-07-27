import { Injectable } from '@angular/core';
import { AllInterfaces, InterfaceName } from './InterfaceName';
import { AllPassages, PassageName } from './PassageName';
import { SessionPair } from './SessionPair';
import { MetricsService } from '../metrics/metrics.service';
import { flatMap } from 'rxjs/operators';
import { QuizMetric } from '../metrics/QuizMetric';
import { of } from 'rxjs';

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

  generateSessionPair = () => {
    return this._metricsService.fetchQuizMetrics().pipe(
      flatMap(quizMetrics => {
        return of(new SessionPair(
          this.getRandomLeastInterface(quizMetrics),
          this.getRandomAvailablePassage(this._availablePassages)
        ));
      })
    )
  };

  getRandomLeastInterface = (quizMetrics: QuizMetric[]) => {
    let minQuizCount = this.findMin(quizMetrics);
    let leastUsedMetrics = quizMetrics.filter(metric => metric.quizCount === minQuizCount);
    return this.randomNameFrom(leastUsedMetrics);
  }

  private findMin = (metrics: QuizMetric[]) => {
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
}

