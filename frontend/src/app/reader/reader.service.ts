import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  private _index = 0;
  constructor() { }

  index() {
    return this._index
  }

  moveAhead() {
    this._index++;
  }
}
