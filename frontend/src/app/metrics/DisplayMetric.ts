import { MetricInterfaceName } from './MetricInterfaceName';

export class DisplayMetric {
  constructor(
    public interfaceName: MetricInterfaceName | string,
    public completionCount: number,
    public quizCount: number) {
  }
}
