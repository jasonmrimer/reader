import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Metric } from './metric';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsService  {

  constructor(private _http: HttpClient) {
  }

  fetchMetrics(): Observable<Metric[]> {
    return this._http.get<Metric[]>(`${environment.apiUrl}/metrics`);
  }
}
