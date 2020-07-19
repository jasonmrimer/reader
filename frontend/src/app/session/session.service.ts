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
  private _currentPair: SessionPair;
  private _sessionId: string;
  private _availableInterfaces: InterfaceName[];
  private _availablePassages: PassageName[];

  private _metricsService: MetricsService;

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
        this._currentPair = new SessionPair(
          this.getRandomLeastUsedAvailableInterface(quizMetrics),
          this.getRandomAvailablePassage(this._availablePassages)
        );
        return of(this._currentPair);
      })
    )
  };

  getRandomLeastUsedAvailableInterface = (quizMetrics: QuizMetric[]) => {
    let leastUsedAvailable = SessionService.convertToInterfaceNames(
      this.filterFromAvailable(
        SessionService.leastUsed(quizMetrics)
      )
    );

    return SessionService.noMoreLeastAvailable(leastUsedAvailable)
      ? this.randomNameFrom(this._availableInterfaces)
      : this.randomNameFrom(leastUsedAvailable);
  }

  private static noMoreLeastAvailable(leastUsedAvailable: InterfaceName[]) {
    return leastUsedAvailable.length == 0;
  }

  private static convertToInterfaceNames(leastUsedAvailable: QuizMetric[]) {
    let names = leastUsedAvailable.map(({interfaceName}) => interfaceName);
    return names;
  }

  private filterFromAvailable(leastUsed: QuizMetric[]) {
    leastUsed = leastUsed.filter(qm => this._availableInterfaces.includes(qm.interfaceName));
    return leastUsed;
  }

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

  private randomNameFrom = (interfaceNames: InterfaceName[]): InterfaceName => {
    return interfaceNames[this.randomIndex(interfaceNames)]
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

  get completedSession(): boolean {
    return this._availableInterfaces.length === 0;
  }

  get currentPair() {
    return this._currentPair;
  }

  completeCurrentPair() {
    this.makeSessionPairUnavailable(this._currentPair);
  }
}

