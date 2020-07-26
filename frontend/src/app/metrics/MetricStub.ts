import { MetricInterfaceName } from './MetricInterfaceName';
import { DisplayMetric } from './DisplayMetric';

const metricStub1 = new DisplayMetric(MetricInterfaceName.BASELINE, 1, 11);
const metricStub2 = new DisplayMetric(MetricInterfaceName.RSVP_BASIC, 2, 11);
const metricStub3 = new DisplayMetric(MetricInterfaceName.RSVP_PROGRESS_BAR, 0, 0);
const metricStub4 = new DisplayMetric(MetricInterfaceName.RSVP_SECTION_MARK, 0, 0);
const metricStub5 = new DisplayMetric(MetricInterfaceName.RSVP_SUBWAY, 3, 33);

export const metricsStub = [
  metricStub1,
  metricStub2,
  metricStub3,
  metricStub4,
  metricStub5,
];
