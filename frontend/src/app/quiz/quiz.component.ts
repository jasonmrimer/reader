import { Component, OnInit } from '@angular/core';
import { ReactSurveyModel, SurveyModel, SurveyNG } from 'survey-angular';
import { QuizService } from './quiz.service';
import { Answer, Question, Quiz } from './Quiz';
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
        const surveyJSON = {
          questions: this.convertToSurvey(this.quiz.questions)
        };
        this.createSurveyComponent(surveyJSON);
      });
  }

  private createSurveyComponent(surveyJSON: { questions: { isRequired: boolean; name: string; colCount: number; type: string; title: string; choices: string[] }[] }) {
    const surveyModel = new ReactSurveyModel(surveyJSON);
    surveyModel.onComplete.add(this.submitAnswers);
    SurveyNG.render('surveyContainer', {model: surveyModel});
  }

  private convertToSurvey(questions: Question[]) {
    return questions.map(
      (question: Question, index: number) => {
        const answers = this.getAnswers(question);
        return this.questionJSON(index, question, answers)
      });
  }

  private questionJSON(index: number, question: Question, answers: string[]) {
    return {
      type: "radiogroup",
      name: `question${index}`,
      title: question.question,
      isRequired: true,
      colCount: 4,
      choices: answers
    };
  }

  private getAnswers(question: Question) {
    return question.answers.map((answer) => {
      return answer.answer
    });
  }

  private submitAnswers = (surveyModel: SurveyModel) => {
    const surveyData = JSON.stringify(surveyModel.data);
    const quizSubmission = new QuizSubmission(
      this.quiz.quizId,
      surveyModel.data
    )
    // this.quizService.postAnswers(quizSubmission);
  }
}
