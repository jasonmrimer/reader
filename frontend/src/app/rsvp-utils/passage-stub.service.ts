import { Injectable } from '@angular/core';
import { PassageService } from './passage.service';
import { defer, Observable, of } from 'rxjs';
import { passagesStub, passageStub } from './PassageStub';
import { Passage } from './passage';

@Injectable({
  providedIn: 'root'
})
export class PassageServiceStub extends PassageService {
  constructor() {
    super(null);
  }

  getPassages() {
    return of(passagesStub);
  }

  getPassage(passageId: number): Observable<Passage> {
    console.log('stub');
    return of(passageStub);
  }
}
