import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  constructor() {
    clearInterval(this.interval);
  }
  interval;
  private _callback: () => void;
  private time: number;

  private static calculatePace(wpm: number) {
    const millisecondsPerMinute = 60000;
    return millisecondsPerMinute / wpm;
  }


  blankSlate() {
    clearInterval(this.interval);
  }

  setInterval(wordsPerMinute: number, callback: () => void) {
    this._callback = callback;
    this.time = IntervalService.calculatePace(wordsPerMinute);
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

  pause(time) {
    if (time > 0) {
      clearInterval(this.interval);
      setTimeout(() => {
        this.runInterval();
      }, time);
    }
  }
}

