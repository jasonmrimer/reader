import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passage-completion',
  templateUrl: './passage-completion.component.html',
  styleUrls: ['./passage-completion.component.css']
})
export class PassageCompletionComponent implements OnInit {
  @Input()
  private quizRoute;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  takeQuiz() {
    this.router.navigate(['/quiz', this.quizRoute]);
  }
}
