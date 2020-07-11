import { TestBed } from '@angular/core/testing';

import { SubwayService } from './subway.service';
import { passageStub } from '../rsvp-utils/PassageStub';
import { Point } from './Point';

describe('SubwayService', () => {
  let service: SubwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert coordinates from a passage into cytoscape nodes', () => {
    let convertedCoordinates = service.convertCoordinatesToNodes(passageStub.coordinates);
    expect(convertedCoordinates).toEqual([
      {
        data: {id: 'section-01', name: '01'},
        position: {x: 1, y: 2}
      },
      {
        data: {id: 'section-02', name: '02'},
        position: {x: 2, y: 1}
      },
    ]);
  });

  it('should create edges', () => {
    expect(false).toBeTruthy();
  });
});
