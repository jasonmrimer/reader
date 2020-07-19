import { InterfaceName } from '../session/InterfaceName';

export class QuizMetric {
  constructor(
    public interfaceName: InterfaceName,
    public quizCount: number,
  ) {
  }
}
