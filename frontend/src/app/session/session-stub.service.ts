import { Injectable } from '@angular/core';
import { InterfaceName } from './InterfaceName';
import { SessionPair } from './SessionPair';
import { of } from 'rxjs';
import { SessionService } from './session.service';
import { PassageName } from './PassageName';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceMock extends SessionService {
  public isComplete: boolean = false;

  get completedSession() {
    return this.isComplete;
  }

  generateSessionPair = () => {
    return of(new SessionPair(InterfaceName.BASELINE, PassageName.ONE));
  }
}

