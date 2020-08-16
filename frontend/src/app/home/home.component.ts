import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { MetricsService } from '../metrics/metrics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toggled: number[] = [];
  isExpanded = true;

  constructor(
    public sessionService: SessionService,
    public metricsService: MetricsService
  ) {
  }

  ngOnInit(): void {
  }

  start() {
    this.metricsService.saveUser(this.sessionService.user).subscribe();
    this.sessionService.navigateToPassage();
  }

  toggle(questionNumber: number) {
    this.toggled.push(questionNumber);
    console.log(this.toggled);
    console.log(this.unansweredQuestions());
    this.isExpanded = this.unansweredQuestions();
  }

  unansweredQuestions = () => {
    return !(this.toggled.includes(1)
      && this.toggled.includes(2)
      && this.toggled.includes(3));
  }
}
