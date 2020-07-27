import { QuizMetric } from './QuizMetric';
import { InterfaceName } from '../session/InterfaceName';

const quizMetricStub1 = () => {
  return new QuizMetric(InterfaceName.BASELINE, 11);
}
const quizMetricStub2 = () => {
  return new QuizMetric(InterfaceName.RSVP_BASIC, 11);
}
const quizMetricStub3 = () => {
  return new QuizMetric(InterfaceName.RSVP_SUBWAY, 33);
}

export const QuizMetricsPartialStub = () => {
  return [
    quizMetricStub1(),
    quizMetricStub2(),
    quizMetricStub3(),
  ];
}

export const QuizMetricsFullStub = [
  new QuizMetric(InterfaceName.BASELINE, 11),
  new QuizMetric(InterfaceName.RSVP_BASIC, 22),
  new QuizMetric(InterfaceName.RSVP_PROGRESS_BAR, 33),
  new QuizMetric(InterfaceName.RSVP_SECTION_MARK, 0),
  new QuizMetric(InterfaceName.RSVP_SUBWAY, 0),
]
