import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  private _index = 0;
  private _contentLength = Number.MAX_SAFE_INTEGER;
  private _isComplete = new BehaviorSubject<boolean>(false);
  isComplete$ = this._isComplete.asObservable();

  constructor() {
  }

  index() {
    return this._index
  }

  moveAhead() {
    this._index++;
    if (this._index + 1 >= this._contentLength) {
      console.log('readerservce');
      this._isComplete.next(true);
    }
  }

  get isComplete(): boolean {
    return this._index + 1 >= this._contentLength;
  }

  set contentLength(value: number) {
    this._contentLength = value;
  }

  percentRead() {
    return (this._index + 1) * 100 / this._contentLength;
  }
}
