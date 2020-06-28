export class Metric {
  constructor(
    public interfaceName: string,
    public completionCount: number,
    public quizCount: number) {
  }
}

export class PassageMetric {
  constructor(
    public interfaceName: string,
    public completionCount: number,
  ) {
  }
}

export class QuizMetric {
  constructor(
    public interfaceName: string,
    public quizCount: number,
  ) {
  }
}

export enum MetricInterface {
  BASELINE = 'Baseline',
  RSVP_BASIC = 'RSVP Basic',
  RSVP_PROGRESS_BAR = 'RSVP Progress Bar',
  RSVP_SECTION_MARK = 'RSVP Section Mark',
}

const passageMetricStub1 = new PassageMetric('int1', 1);
const passageMetricStub2 = new PassageMetric('int2', 2);
const passageMetricStub3 = new PassageMetric('int3', 3);
export const passageMetricsStub = [
  passageMetricStub1,
  passageMetricStub2,
  passageMetricStub3
];

const quizMetricStub1 = new QuizMetric('int1', 11);
const quizMetricStub2 = new QuizMetric('int2', 22);
const quizMetricStub3 = new QuizMetric('int3', 33);
export const quizMetricsStub = [
  quizMetricStub1,
  quizMetricStub2,
  quizMetricStub3
];

const metricStub1 = new Metric('int1', 1, 11);
const metricStub2 = new Metric('int2', 2, 22);
const metricStub3 = new Metric('int3', 3, 33);
export const metricsStub = [
  metricStub1,
  metricStub2,
  metricStub3
];
