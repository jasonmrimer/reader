import { TestBed } from '@angular/core/testing';

import { MetricsService } from './metrics.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizMetric } from './QuizMetric';
import { InterfaceName } from '../session/InterfaceName';
import { passageMetricsStub } from './PassageMetricStub';
import { QuizMetricsPartialStub } from './QuizMetricStub';
import { metricsStub } from './MetricStub';
import { DisplayMetric } from './DisplayMetric';
import { completionCountsJson, completionCountsStub } from './CompletionCountStub';
import { CompletionCount } from './CompletionCount';

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

  it('should start with 0 metrics for all interfaces when none exist', () => {
    const metrics = service.mergeMetrics([], []);
    expect(metrics).toEqual([
      new DisplayMetric(InterfaceName.BASELINE, 0, 0),
      new DisplayMetric(InterfaceName.RSVP_BASIC, 0, 0),
      new DisplayMetric(InterfaceName.RSVP_PROGRESS_BAR, 0, 0),
      new DisplayMetric(InterfaceName.RSVP_SECTION_MARK, 0, 0),
      new DisplayMetric(InterfaceName.RSVP_SUBWAY, 0, 0),
    ]);
  });

  it('should get passage completion metrics', () => {
    service.fetchCompletionMetrics().subscribe((response: CompletionCount[]) => {
      expect(response).toEqual(completionCountsStub);
    })

    passageGETStub();
  });

  it('should update a passage completion metric', () => {
    service.postPassageCompletion(InterfaceName.RSVP_BASIC, 'fakeUser')
      .subscribe(() => {
      });
    passagePOSTStub();
  });

  it('should fetch the quiz metrics and zeroize all non-used interfaces', () => {
    let expectedQuizMetrics = [
      new QuizMetric(InterfaceName.BASELINE, 11),
      new QuizMetric(InterfaceName.RSVP_BASIC, 11),
      new QuizMetric(InterfaceName.RSVP_SUBWAY, 33),
      new QuizMetric(InterfaceName.RSVP_SECTION_MARK, 0),
      new QuizMetric(InterfaceName.RSVP_PROGRESS_BAR, 0),
    ];

    service.fetchQuizMetrics().subscribe((response: QuizMetric[]) => {
      expect(response).toEqual(jasmine.arrayWithExactContents(expectedQuizMetrics));
    });

    quizGETStub();
  });

  it('should combine the quiz and passage metrics into a single metric', () => {
    const metrics = service.mergeMetrics(passageMetricsStub, QuizMetricsPartialStub());
    expect(metrics).toEqual(metricsStub);
  });

  it('should combine the quiz and completion metrics into a single metric', () => {
    const metrics = service.mergeMetricsV2(completionCountsStub, QuizMetricsPartialStub());
    expect(metrics).toEqual(jasmine.arrayWithExactContents(metricsStub));
  });

  function passageGETStub() {
    const request = httpMock.expectOne('http://localhost:4000/api/metrics-passage');
    expect(request.request.method).toBe('GET');
    request.flush(completionCountsJson);
  }

  function passagePOSTStub() {
    const request = httpMock.expectOne('http://localhost:4000/api/metrics-passage');
    expect(request.request.method).toBe('POST');
    expect(request.request.body.date).toBeDefined();
    expect(request.request.body.interfaceName).toBe('rsvp-basic');
    expect(request.request.body.user).toBeDefined('fakeUser');
  }

  function quizGETStub() {
    const request = httpMock.expectOne('http://localhost:4000/api/metrics-quiz');
    expect(request.request.method).toBe('GET');
    request.flush(QuizMetricsPartialStub());
  }
});
