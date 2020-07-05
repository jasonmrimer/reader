import { TestBed } from '@angular/core/testing';

import { PassageService } from './passage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Passage } from './passage';
import { passageStub } from './PassageStub';

describe('PassageService', () => {
  let service: PassageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PassageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch via passage ID', () => {
    service.getPassage(1).subscribe((response: Passage) => {
      expect(response).toEqual(passageStub);
    })

    const request = httpMock.expectOne('http://localhost:4000/api/passage?id=1');
    expect(request.request.method).toBe('GET');
    request.flush(passageStub);
  });
});
