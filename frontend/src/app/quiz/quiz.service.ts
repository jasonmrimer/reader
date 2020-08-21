import { Injectable } from '@angular/core';
import { Question, Quiz } from './Quiz';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuizSubmission } from './QuizSubmission';
import { PassageName } from '../session/PassageName';
import { SessionService } from '../session/session.service';
import { Score } from './Score';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) {
  }

  getQuizzes() {
    return this._http.get<Quiz[]>(`${environment.apiUrl}/quizzes`);
  }

  postAnswers(sessionService: SessionService, quiz: Quiz, surveyData: any) {
    const quizSubmission = this.generateSubmission(
      sessionService,
      quiz,
      surveyData
    );

    sessionService.addScore(this.calculateScore(quizSubmission));

    return this._http.post(
      `${environment.apiUrl}/quizzes`,
      quizSubmission
    );
  }

  getQuiz(passageId: PassageName) {
    const params = new HttpParams().set('id', String(passageId));
    return this._http.get<Quiz>(
      `${environment.apiUrl}/quiz`,
      {params: params}
    );
  }

  generateSubmission(sessionService: SessionService, quiz: Quiz, data: any) {
    const answers = this.convertDataToAnswers(data, quiz);

    return new QuizSubmission(
      quiz.passage,
      sessionService.currentPair.interfaceName,
      sessionService.user,
      new Date(),
      answers
    );
  }

  private convertDataToAnswers(surveyData: any, quiz: Quiz) {
    const keys = Object.keys(surveyData);
    return keys.map((key: string) => {
      return this.matchAnswerToChoice(key, surveyData[key], quiz);
    });
  }

  private matchAnswerToChoice(question: string, answer: string, quiz: Quiz) {
    console.log(question);
    console.log(answer);
    const questionObject = quiz.questions.find(q => q.question === question);
    const answerObject = questionObject.choices.find(a => a.text === answer);
    return new Question(
      questionObject.question,
      questionObject.isLocationBased,
      [answerObject]
    );
  }

  private calculateScore(quizSubmission: QuizSubmission) {
    const total = quizSubmission.answers.length;
    const correct = quizSubmission.answers.filter(answer => {
      return answer.choices[0].correct;
    }).length;
    return new Score(quizSubmission.passageId, quizSubmission.interfaceName, correct, total);
  }
}
