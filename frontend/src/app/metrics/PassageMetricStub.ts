import { PassageMetric } from './PassageMetric';
import { MetricInterfaceName } from './MetricInterfaceName';

const passageMetricStub1 = new PassageMetric(MetricInterfaceName.BASELINE, 1);
const passageMetricStub2 = new PassageMetric(MetricInterfaceName.RSVP_BASIC, 2);
const passageMetricStub3 = new PassageMetric(MetricInterfaceName.RSVP_SUBWAY, 3);

export const passageMetricsStub = [
  passageMetricStub1,
  passageMetricStub2,
  passageMetricStub3
];
