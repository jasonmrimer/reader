import { Injectable } from '@angular/core';
import { MetricsService } from './metrics.service';
import { Observable, of } from 'rxjs';
import { Metric } from './metric';

@Injectable({
  providedIn: 'root'
})
export class MetricsServiceStub extends MetricsService {
  constructor() {
    super(null);
  }
  fetchMetrics(): Observable<Metric[]> {
    return of([
      new Metric('Baseline', 2),
      new Metric('RSVP Basic', 4),
      new Metric('RSVP Completion Meter', 6),
      new Metric('RSVP Section Marker', 8)
    ]);
  }
}
