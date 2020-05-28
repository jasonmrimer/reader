import { IntervalService } from './interval.service';
import createSpy = jasmine.createSpy;

export class IntervalServiceMock extends IntervalService {
  clearInterval = createSpy('clearInterval called');

  setInterval(time: number, callback: () => void) {
    super.setInterval(time, callback);
  }

  runInterval() {
    this.callback();
    return null;
  }

  tick() {
    this.callback();
  }
}
