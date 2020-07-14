import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {
  interval;
  private _callback: () => void;
  private time: number;

  constructor() { }

  setInterval(wordsPerMinute: number, callback: () => void) {
    this._callback = callback;
    this.time = this.calculatePace(wordsPerMinute);
  }

  runInterval() {
    this.interval = setInterval(this._callback, this.time);
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  callback() {
    this._callback();
  }

  private calculatePace(wpm: number) {
    let millisecondsPerMinute = 60000;
    return millisecondsPerMinute / wpm;
  }
}

