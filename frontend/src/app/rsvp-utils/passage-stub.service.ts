import { Injectable } from '@angular/core';
import { PassageService } from './passage.service';
import { defer, of } from 'rxjs';
import { passagesStub } from './PassageStub';

@Injectable()
export class PassageServiceStub extends PassageService {
  constructor() {
    super(null);
  }

  getPassages() {
    return of(passagesStub);
    // return fakeAsyncResponse(passagesStub);
  }

}

export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data))
}
