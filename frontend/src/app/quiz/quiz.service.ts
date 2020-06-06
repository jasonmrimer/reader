import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SurveyModel } from 'survey-angular';

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

  postAnswers(quizId: string, surveyModel: any) {
    const resultsAsString = JSON.stringify(surveyModel.data);
  }
}
