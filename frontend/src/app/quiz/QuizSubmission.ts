import { User } from '../session/User';
import { Question } from './Quiz';

export class QuizSubmission {
  constructor(
    public passageId: string,
    public interfaceName: string,
    public user: User,
    public date: Date,
    public answers: Question[]
  ) {
  }
}
