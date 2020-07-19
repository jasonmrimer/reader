import { InterfaceName } from '../session/InterfaceName';

export class DisplayMetric {
  constructor(
    public interfaceName: InterfaceName | string,
    public completionCount: number,
    public quizCount: number) {
  }
}
