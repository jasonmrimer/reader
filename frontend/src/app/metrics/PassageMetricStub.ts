import { PassageMetric } from './PassageMetric';
import { InterfaceName } from '../session/InterfaceName';

const passageMetricStub1 = new PassageMetric("fakeuser", new Date(), InterfaceName.BASELINE, 1);
const passageMetricStub2 = new PassageMetric("fakeuser", new Date(), InterfaceName.RSVP_BASIC, 2);
const passageMetricStub3 = new PassageMetric("fakeuser", new Date(), InterfaceName.RSVP_SUBWAY, 3);

export const passageMetricsStub = [
  passageMetricStub1,
  passageMetricStub2,
  passageMetricStub3
];
