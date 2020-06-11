import { TestBed } from '@angular/core/testing';

import { ReaderService } from './reader.service';

describe('ReaderService', () => {
  let service: ReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate percent read', () => {
    service.contentLength = 8;
    service.moveAhead();
    service.moveAhead();
    expect(service.percentRead()).toBe(37.5);
  });

  it('should be completed at the end', () => {
    service.contentLength = 2;
    expect(service.isComplete).toBeFalse();
    service.moveAhead();
    expect(service.isComplete).toBeTrue();

  });
});
