export class Metric {
  constructor(
    public interfaceName: string,
    public completionCount: number) {
  }
}

export enum MetricInterface {
  BASELINE = 'Baseline',
  RSVP_BASIC = 'RSVP Basic',
  RSVP_COMPLETION_METER = 'RSVP Completion Meter',
  RSVP_SECTION_MARK = 'RSVP Section Mark',
}
const metricStub1 = new Metric('int1', 1);
const metricStub2 = new Metric('int2', 2);
const metricStub3 = new Metric('int3', 3);
export const metricsStub = [metricStub1, metricStub2, metricStub3];
