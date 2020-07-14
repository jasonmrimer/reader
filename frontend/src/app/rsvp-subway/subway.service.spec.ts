import { TestBed } from '@angular/core/testing';

import { SubwayService } from './subway.service';
import { passageStub } from '../rsvp-utils/PassageStub';

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
    let nodes = service.convertCoordinatesToNodes(passageStub.coordinates);
    expect(nodes).toEqual([
      {
        data: {id: 'section-01', name: '01'},
        position: {x: 1, y: 1}
      },
      {
        data: {id: 'section-02', name: '02'},
        position: {x: 2, y: 2}
      },
    ]);
  });

  it('should create edges', () => {
    let nodes = service.convertCoordinatesToNodes(passageStub.coordinates);
    let edges = service.createEdgesFromNodes(nodes);
    expect(edges).toEqual([
      {data: {id: 'edge-1', source: 'section-01', target: 'section-02'}},
    ]);
  });
});
