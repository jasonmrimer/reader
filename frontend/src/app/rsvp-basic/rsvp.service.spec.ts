import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { RSVPService } from './rsvp.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Passage } from '../passage/passage';
import { passagesStub, passageStub } from './PassageStub';

describe('RSVPService', () => {
  let injector: TestBed;
  let service: RSVPService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RSVPService]
    });

    injector = getTestBed();
    service = injector.get(RSVPService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', inject([RSVPService], (service: RSVPService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a passage', function () {
    service.getPassages().subscribe((response: Passage[]) => {
      expect(response).toEqual(passagesStub);
    })

    const request = httpMock.expectOne('http://localhost:4000/api/passages');
    expect(request.request.method).toBe('GET');
    request.flush(passagesStub);
  });

  it('should transform passage content into RSVP shape', function () {
    expect(service.transformToRSVPWithoutSections(passageStub.content)).toEqual([
      'One', 'two.', 'Three.', 'Four', 'five', 'six.', 'Seven', 'eight.'
    ]);
  });

  it('should transform passage content into RSVP shape and include section-markers', () => {
    expect(service.transformToRSVPWithSections(passageStub.content)).toEqual([
      '#section-marker',
      'One',
      'two.',
      'Three.',
      '#section-marker',
      'Four',
      'five',
      'six.',
      'Seven',
      'eight.'
    ]);
  });

  it('should output array of section marks', () => {
    const transformedContent = service.transformToRSVPWithSections(passageStub.content);
    expect(service.calculateSectionTicks(transformedContent)).toEqual([0, 3]);
  });

  it('should calculate the percentage position of ticks based placement of section-marker', () => {
    const transformedContent = service.transformToRSVPWithSections(passageStub.content);
    expect(service.calculateTickPositions(transformedContent)).toEqual([0, 37.5]);
  });
});
