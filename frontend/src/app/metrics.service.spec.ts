import { TestBed } from '@angular/core/testing';

import { MetricsService } from './metrics.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Metric, MetricInterface, metricsStub } from './metric';

describe('MetricsService', () => {
  let service: MetricsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(MetricsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get metrics', () => {
    service.fetchMetrics().subscribe((response: Metric[]) => {
      expect(response).toEqual(metricsStub);
    })

    const request = httpMock.expectOne('http://localhost:4000/api/metrics');
    expect(request.request.method).toBe('GET');
    request.flush(metricsStub);
  });

  it('should update a metric', () => {
    service.postPassageCompletion(MetricInterface.RSVP_BASIC)
      .subscribe(()=>{});
    const request = httpMock.expectOne('http://localhost:4000/api/metrics');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({interfaceName: 'RSVP Basic'});
  });
});
