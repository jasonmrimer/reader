import { TestBed } from '@angular/core/testing';

import { MetricsService } from './metrics.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PassageMetric } from './PassageMetric';
import { QuizMetric } from './QuizMetric';
import { MetricInterfaceName } from './MetricInterfaceName';
import { passageMetricsStub } from './PassageMetricStub';
import { QuizMetricsStub } from './QuizMetricStub';
import { metricsStub } from './MetricStub';

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

  it('should update a passage completion metric', () => {
    service.postPassageCompletion(MetricInterfaceName.RSVP_BASIC)
      .subscribe(() => {
      });
    passagePOSTStub();
  });

  it('should fetch the quiz metrics and zeroize all non-used interfaces', () => {
    let expectedQuizMetrics = [
      new QuizMetric(MetricInterfaceName.BASELINE, 11),
      new QuizMetric(MetricInterfaceName.RSVP_BASIC, 11),
      new QuizMetric(MetricInterfaceName.RSVP_SUBWAY, 33),
      new QuizMetric(MetricInterfaceName.RSVP_SECTION_MARK, 0),
      new QuizMetric(MetricInterfaceName.RSVP_PROGRESS_BAR, 0),
    ];

    service.fetchQuizMetrics().subscribe((response: QuizMetric[]) => {
      expect(response).toEqual(expectedQuizMetrics);
    });

    quizGETStub();
  });

  it('should combine the quiz and completion metrics into a single metric', () => {
    const metrics = service.mergeMetrics(passageMetricsStub, QuizMetricsStub());
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
    request.flush(QuizMetricsStub());
  }
});
