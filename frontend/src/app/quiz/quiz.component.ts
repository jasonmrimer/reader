import { Component, OnInit } from '@angular/core';
import { ReactSurveyModel, SurveyModel, SurveyNG } from 'survey-angular';
import { QuizService } from './quiz.service';
import { Choice, Question, Quiz } from './Quiz';
import { QuizSubmission } from './QuizSubmission';


SurveyNG.apply({theme: 'modern'});

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quiz: Quiz;
  private quizService: QuizService;

  constructor(private _quizService: QuizService) {
    this.quizService = _quizService;
  }

  ngOnInit() {
    this.quizService.getQuizzes()
      .subscribe(quizzes => {
        this.quiz = quizzes[0];
        console.log(this.quiz);
        const surveyJSON = {
          questions: this.convertToSurveyQuestions(this.quiz.questions)
        };
        this.createSurveyComponent(surveyJSON);
      });
  }

  private createSurveyComponent(surveyJSON: any) {
    console.log('========1');
    console.log(this.quiz);
    const surveyModel = new ReactSurveyModel(surveyJSON);
    console.log('========2');
    surveyModel.onComplete.add(this.submitAnswers);
    SurveyNG.render('surveyContainer', {model: surveyModel});
  }

  private convertToSurveyQuestions(questions: Question[]) {
    console.log('conversion');
    console.log(questions);
    return questions.map((question: Question) => {
      const choicesText = this.extractChoiceTextFrom(question);
      return this.questionJSON(question, choicesText)
    });
  }

  private questionJSON(question: Question, choices: string[]) {
    return {
      type: 'radiogroup',
      name: question.question,
      title: question.question,
      isRequired: true,
      colCount: 4,
      choices: choices
    };
  }

  private extractChoiceTextFrom(question: Question) {
    return question.choices.map((choice: Choice) => {
      return choice.text
    });
  }

  private submitAnswers = (surveyModel: SurveyModel) => {
    const quizSubmission = new QuizSubmission(
      this.quiz.passage,
      surveyModel.data
    )
    this.quizService.postAnswers(quizSubmission);
  }
}
