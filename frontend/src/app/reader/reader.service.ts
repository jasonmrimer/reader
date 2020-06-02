import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  private _index = 0;
  private _contentLength = 0;

  constructor() {
  }

  index() {
    return this._index
  }

  moveAhead() {
    this._index++;
  }

  set contentLength(value: number) {
    this._contentLength = value;
  }

  percentRead() {
    return (this._index + 1) * 100 / this._contentLength;
  }
}
