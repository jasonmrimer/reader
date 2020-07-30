import { Component, OnInit } from '@angular/core';
import { ReactSurveyModel, SurveyModel, SurveyNG } from 'survey-angular';
import { QuizService } from './quiz.service';
import { Choice, Question, Quiz } from './Quiz';
import { QuizSubmission } from './QuizSubmission';
import { ActivatedRoute, Router } from '@angular/router';
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
  interfaceName: string;
  didSubmit: boolean = false;


  constructor(
    private _quizService: QuizService,
    private route: ActivatedRoute,
    public sessionService: SessionService,
    private router: Router
  ) {
    this.quizService = _quizService;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.interfaceName = params.get('interfaceName');
    });

    this.quizService.getQuizzes()
      .subscribe(quizzes => {
        this.quiz = quizzes[0];
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
    this.didSubmit = true;
    const quizSubmission = new QuizSubmission(
      this.quiz.passage,
      surveyModel.data,
      this.interfaceName
    )
    this.sessionService.completeCurrentPair();
    this.quizService.postAnswers(quizSubmission)
      .subscribe();
  }
  tryNew = () => {
    this.router.navigate([`/home`]);
  }
}
