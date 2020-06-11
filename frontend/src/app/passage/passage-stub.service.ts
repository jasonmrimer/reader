import { Injectable } from '@angular/core';
import { PassageService } from './passage.service';
import { Observable, of } from 'rxjs';
import { Passage } from './passage';
import { passagesStub } from '../rsvp-basic/PassageStub';

@Injectable()
export class PassageServiceStub extends PassageService {
  constructor() {
    super(null);
  }

  getPassages(): Observable<Passage[]> {
    return of(passagesStub);
  }
}
