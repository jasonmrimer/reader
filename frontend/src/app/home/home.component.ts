import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    public sessionService: SessionService
  ) {
  }

  ngOnInit(): void {
  }

  start() {
    this.sessionService.generateSessionPair().subscribe((pair) => {
      this.router.navigate([`/${pair.interfaceName}/${pair.passageName}`]);
    });
  }
}
