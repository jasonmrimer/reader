import { Component, OnInit } from '@angular/core';
import { ReactSurveyModel, Survey, SurveyNG } from 'survey-angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var json = { questions: [
        { type: "radiogroup", name: "car", title: "What car are you driving?", isRequired: true,
          colCount: 4, choices: ["None", "Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"] }
      ]};


    var model = new ReactSurveyModel(json);
    SurveyNG.render('surveyContainer', { model: model });
  }
}
