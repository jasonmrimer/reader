import { QuizService } from './quiz.service';
import { Observable, of } from 'rxjs';
import { QuizSubmission } from './QuizSubmission';

export class QuizServiceStub extends QuizService {
  postAnswers(quizSubmission: QuizSubmission): Observable<Object> {
    return of(quizSubmission);
  }
}
