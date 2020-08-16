import { Component, OnInit } from '@angular/core';
import { ReactSurveyModel, SurveyModel, SurveyNG } from 'survey-angular';
import { QuizService } from './quiz.service';
import { Choice, Question, Quiz } from './Quiz';
import { QuizSubmission } from './QuizSubmission';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';

SurveyNG.apply({theme: 'modern'});

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  quiz: Quiz;
  private quizService: QuizService;
  didSubmit = false;

  constructor(
    private _quizService: QuizService,
    public sessionService: SessionService,
    private router: Router
  ) {
    this.quizService = _quizService;
  }

  private static questionJSON(question: Question, choices: string[]) {
    return {
      type: 'radiogroup',
      name: question.question,
      title: question.question,
      isRequired: true,
      colCount: 1,
      choices: choices
    };
  }

  private static extractChoiceTextFrom(question: Question) {
    return question.choices.map((choice: Choice) => {
      return choice.text;
    });
  }

  ngOnInit() {
    this.quizService.getQuiz(this.sessionService.currentPair.passageName)
      .subscribe(quiz => {
        console.log('subscribe');
        this.quiz = quiz[0];
        console.log(this.quiz);
        const surveyJSON = {
          questions: this.convertToSurveyQuestions(this.quiz.questions)
        };
        this.createSurveyComponent(surveyJSON);
      });
  }

  private createSurveyComponent(surveyJSON: any) {
    const surveyModel = new ReactSurveyModel(surveyJSON);
    surveyModel.onComplete.add(this.submitAnswers);
    SurveyNG.render('surveyContainer', {model: surveyModel});
  }

  private convertToSurveyQuestions(questions: Question[]) {
    return questions.map((question: Question) => {
      const choicesText = QuizComponent.extractChoiceTextFrom(question);
      return QuizComponent.questionJSON(question, choicesText);
    });
  }

  private submitAnswers = (surveyModel: SurveyModel) => {
    const quizSubmission = new QuizSubmission(
      this.quiz.passage,
      surveyModel.data,
      this.sessionService.currentPair.interfaceName,
      this.sessionService.sessionId,
      new Date()
    );

    this.quizService.postAnswers(quizSubmission)
      .subscribe(() => {
        this.didSubmit = true;
        this.sessionService.completeCurrentPair();
        this.continueOrComplete();
      });
  }

  tryNew = () => {
    this.sessionService.navigateToPassage();
  }

  private continueOrComplete() {
    if (this.sessionService.completedSession) {
      this.router.navigate(['/outro']).then();
    }
  }
}
