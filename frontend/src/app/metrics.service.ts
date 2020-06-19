import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Metric, MetricInterface } from './metric';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetricsService  {

  constructor(private _http: HttpClient) {
  }

  fetchMetrics(): Observable<Metric[]> {
    return this._http.get<Metric[]>(`${environment.apiUrl}/metrics`);
  }

  postPassageCompletion(metricInterface: MetricInterface) {
    return this._http.post(
      `${environment.apiUrl}/metrics`,
      {interfaceName: metricInterface},
      {responseType: 'json'}
    )
  }

  private handleError(error: string) {
    return function (p1: any, p2: Observable<Object>) {
      return undefined;
    };
  }
}
