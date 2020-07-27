import { PassageMetric } from './PassageMetric';
import { InterfaceName } from '../session/InterfaceName';

const passageMetricStub1 = new PassageMetric(InterfaceName.BASELINE, 1);
const passageMetricStub2 = new PassageMetric(InterfaceName.RSVP_BASIC, 2);
const passageMetricStub3 = new PassageMetric(InterfaceName.RSVP_SUBWAY, 3);

export const passageMetricsStub = [
  passageMetricStub1,
  passageMetricStub2,
  passageMetricStub3
];
