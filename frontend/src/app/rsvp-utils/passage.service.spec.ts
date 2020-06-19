import { TestBed, inject } from '@angular/core/testing';

import { PassageService } from './passage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PassageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PassageService]
    });
  });

  it('should be created', inject([PassageService], (service: PassageService) => {
    expect(service).toBeTruthy();
  }));
});
