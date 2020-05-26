import { TestBed } from '@angular/core/testing';

import { IntervalService } from './interval.service';
import createSpy = jasmine.createSpy;


export class IntervalServiceMock extends IntervalService {
  callback;

  clearInterval = createSpy('clearInterval called');

  setInterval(time: number, callback: () => void) {
    this.callback = callback;
    return null;
  }

  tick() {
    this.callback();
  }
}

describe('IntervalService', () => {
  let service: IntervalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
