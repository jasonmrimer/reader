import { QuizMetric } from './QuizMetric';
import { MetricInterfaceName } from './MetricInterfaceName';

const quizMetricStub1 = () => {
  return new QuizMetric(MetricInterfaceName.BASELINE, 11);
}
const quizMetricStub2 = () => {
  return new QuizMetric(MetricInterfaceName.RSVP_BASIC, 11);
}
const quizMetricStub3 = () => {
  return new QuizMetric(MetricInterfaceName.RSVP_SUBWAY, 33);
}

export const QuizMetricsStub = () => {
  return [
    quizMetricStub1(),
    quizMetricStub2(),
    quizMetricStub3(),
  ];
}
