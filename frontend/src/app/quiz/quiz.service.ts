import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  check() {
    return 'real';
  }
  getQuizzes() {
    return this._http.get<Quiz[]>(`${environment.apiUrl}/quizzes`);
  }
  submitAnswers(surveyModel: any) {
    console.log(surveyModel);
    const resultsAsString = JSON.stringify(surveyModel.data);

  }
}
