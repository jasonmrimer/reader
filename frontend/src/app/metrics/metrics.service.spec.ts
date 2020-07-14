import { TestBed } from '@angular/core/testing';

import { MetricsService } from './metrics.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MetricInterface, metricsStub, PassageMetric, passageMetricsStub, QuizMetric, quizMetricsStub } from './metric';

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

  it('should get passage completion metrics', () => {
    service.fetchPassageMetrics().subscribe((response: PassageMetric[]) => {
      expect(response).toEqual(passageMetricsStub);
    })

    passageGETStub();
  });

  it('should update leftWithoutCenter passage completion metric', () => {
    service.postPassageCompletion(MetricInterface.RSVP_BASIC)
      .subscribe(()=>{});
    passagePOSTStub();
  });

  it('should fetch the quiz metrics', () => {
    service.fetchQuizMetrics().subscribe((response: QuizMetric[]) => {
      expect(response).toEqual(quizMetricsStub);
    });

    quizGETStub();
  });

  it('should combine the quiz and completion metrics into leftWithoutCenter single metric', () => {
    const metrics = service.mergeMetrics(passageMetricsStub, quizMetricsStub);
    expect(metrics).toEqual(metricsStub);
  });

  function passageGETStub() {
    const request = httpMock.expectOne('http://localhost:4000/api/metrics-passage');
    expect(request.request.method).toBe('GET');
    request.flush(passageMetricsStub);
  }

  function passagePOSTStub() {
    const request = httpMock.expectOne('http://localhost:4000/api/metrics-passage');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({interfaceName: 'rsvp-basic'});
  }

  function quizGETStub() {
    const request = httpMock.expectOne('http://localhost:4000/api/metrics-quiz');
    expect(request.request.method).toBe('GET');
    request.flush(quizMetricsStub);
  }
});
