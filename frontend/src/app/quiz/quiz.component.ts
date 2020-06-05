import { Component, OnInit } from '@angular/core';
import { ReactSurveyModel, Survey, SurveyModel, SurveyNG, SurveyWindowNG } from 'survey-angular';
import { QuizService } from './quiz.service';
import { Question, Quiz } from './Quiz';


SurveyNG.apply({theme: 'modern'});

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
        const questions = this.quiz.questions
          .map((question: Question, index: number) => {
            const answers = question.answers.map((answer) => {
              return answer.answer
            });
            return {
              type: "radiogroup",
              name: `question${index}`,
              title: question.question,
              isRequired: true,
              colCount: 4,
              choices: answers
            }
          });

        var json = {
          questions: questions
        };

        // var survey = new Survey.Model(surveyJSON);
        // Survey.SurveyWindowNG.render("surveyElement", {model:survey});

        var surveyModel = new ReactSurveyModel(json);
        surveyModel.onComplete.add(this.quizService.submitAnswers);
        SurveyNG.render('surveyContainer', {model: surveyModel});
      });
  }
}
