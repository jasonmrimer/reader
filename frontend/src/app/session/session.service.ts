import { Injectable } from '@angular/core';
import { AllInterfaces, InterfaceName } from './InterfaceName';
import { AllPassages, PassageName } from './PassageName';
import { SessionPair } from './SessionPair';
import { MetricsService } from '../metrics/metrics.service';
import { flatMap } from 'rxjs/operators';
import { QuizMetric } from '../metrics/QuizMetric';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _router: Router;
  private _currentPair: SessionPair;
  private _sessionId: string;
  private _availableInterfaces: InterfaceName[];
  private _availablePassages: PassageName[];
  private _metricsService: MetricsService;

  get availableInterfaces(): InterfaceName[] {
    return this._availableInterfaces;
  }

  get availablePassages(): PassageName[] {
    return this._availablePassages;
  }

  get completedSession(): boolean {
    return this._availableInterfaces.length === 0;
  }

  get currentPair() {
    return this._currentPair;
  }

  get router() {
    return this._router;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  private static noMoreLeastAvailable(leastUsedAvailable: InterfaceName[]) {
    return leastUsedAvailable.length === 0;
  }

  private static convertToInterfaceNames(leastUsedAvailable: QuizMetric[]) {
    return leastUsedAvailable.map(({interfaceName}) => interfaceName);
  }

  private static leastUsed(quizMetrics: QuizMetric[]): QuizMetric[] {
    const minQuizCount = SessionService.findMin(quizMetrics);
    return quizMetrics.filter(metric => metric.quizCount === minQuizCount);
  }

  private static findMin = (metrics: QuizMetric[]) => {
    let min = Number.MAX_SAFE_INTEGER;
    metrics.map(metric => {
      min = Math.min(metric.quizCount, min);
    });
    return min;
  }

  hydrate(metricsService: MetricsService, router) {
    this._sessionId = `${Date.now()}${Math.random()}`;
    this._availableInterfaces = [...AllInterfaces];
    this._availablePassages = [...AllPassages];
    this._metricsService = metricsService;
    this._router = router;
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
    );
  }

  getRandomLeastUsedAvailableInterface = (quizMetrics: QuizMetric[]) => {
    const leastUsedAvailable = SessionService.convertToInterfaceNames(
      this.filterFromAvailable(
        SessionService.leastUsed(quizMetrics)
      )
    );

    return SessionService.noMoreLeastAvailable(leastUsedAvailable)
      ? this.randomNameFrom(this._availableInterfaces)
      : this.randomNameFrom(leastUsedAvailable);
  }

  private filterFromAvailable(leastUsed: QuizMetric[]) {
    leastUsed = leastUsed.filter(qm => this._availableInterfaces.includes(qm.interfaceName));
    return leastUsed;
  }

  private randomNameFrom = (interfaceNames: InterfaceName[]): InterfaceName => {
    return interfaceNames[this.randomIndex(interfaceNames)];
  }

  private randomIndex = (array) => {
    return Math.floor((Math.random() * array.length) + 1) - 1;
  }

  private getRandomAvailablePassage(availablePassages: PassageName[]) {
    return availablePassages[this.randomIndex(availablePassages)];
  }

  makeSessionPairUnavailable(sessionPair: SessionPair) {
    this._availableInterfaces = this._availableInterfaces.filter((interfaceName) => {
      return interfaceName !== sessionPair.interfaceName;
    });

    this._availablePassages = this._availablePassages.filter((passageName) => {
      return passageName !== sessionPair.passageName;
    });
  }

  completeCurrentPair() {
    this.makeSessionPairUnavailable(this._currentPair);
  }

  navigateToPassage() {
    this.generateSessionPair().subscribe((pair) => {
      this.router.navigate([`/${pair.interfaceName}/${pair.passageName}`]);
    });
  }
}

