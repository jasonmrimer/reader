import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QuizSubmission } from './QuizSubmission';
import { PassageName } from '../session/PassageName';
import { Passage } from '../rsvp-utils/passage';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) {
  }

  getQuizzes() {
    return this._http.get<Quiz[]>(`${environment.apiUrl}/quizzes`);
  }

  postAnswers(quizSubmission: QuizSubmission) {
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
}
