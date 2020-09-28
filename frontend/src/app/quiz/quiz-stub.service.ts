import { QuizService } from './quiz.service';
import { Observable, of } from 'rxjs';
import { Submission } from './Submission';
import { SessionService } from '../session/session.service';
import { Quiz } from './Quiz';

export class QuizServiceStub extends QuizService {
  postAnswers(sessionService: SessionService, quiz: Quiz, surveyData: any) {
    return of(quizSubmission);
  }
}
