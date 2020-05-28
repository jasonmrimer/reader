import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {
  interval;
  private _callback: () => void;
  private time: number;

  constructor() { }

  setInterval(time: number, callback: () => void) {
    this._callback = callback;
    this.time = time;
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
}

