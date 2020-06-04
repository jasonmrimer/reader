import { Component, OnInit } from '@angular/core';
import { ReactSurveyModel, SurveyNG } from 'survey-angular';
import { QuizService } from './quiz.service';
import { Question, Quiz } from './Quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  quiz: Quiz;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    this.quizService.getQuizzes()
      .subscribe(quizzes => {
        this.quiz = quizzes[0];
        const questions = this.quiz.questions.map((question: Question) => {
          const answers = question.answers.map((answer) => {
            return answer.answer
          });
          return {
            type: "radiogroup",
            name: "car",
            title: question.question,
            isRequired: true,
            colCount: 4,
            choices: answers
          }
        });

        var json = {
          questions: questions
        };


        var model = new ReactSurveyModel(json);
        SurveyNG.render('surveyContainer', {model: model});
      });
  }
}
