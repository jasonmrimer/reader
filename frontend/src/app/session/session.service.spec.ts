import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { AllInterfaces, InterfaceName } from './InterfaceName';
import { AllPassages, PassageName } from './PassageName';
import { SessionPair } from './SessionPair';
import { MetricsServiceStub } from '../metrics/metrics-stub.service';
import { HttpTestingController } from '@angular/common/http/testing';

describe('SessionService', () => {
  let service: SessionService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
    service.hydrate(new MetricsServiceStub());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should establish a session id', () => {
    expect(service.sessionId).toBeDefined();
  });

  it('should track available interfaces and passages', () => {
    expect(service.availableInterfaces).toEqual(jasmine.arrayWithExactContents(AllInterfaces));
    expect(service.availablePassages).toEqual(jasmine.arrayWithExactContents(AllPassages));
  });

  it('should output a interface/passage pair based on random, least-used yet available to session', () => {
    const expectedPairs = [
      new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.ONE),
      new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.TWO),
      new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.THREE),
      new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.FOUR),
      new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.FIVE),
      new SessionPair(InterfaceName.RSVP_SECTION_MARK, PassageName.ONE),
      new SessionPair(InterfaceName.RSVP_SECTION_MARK, PassageName.TWO),
      new SessionPair(InterfaceName.RSVP_SECTION_MARK, PassageName.THREE),
      new SessionPair(InterfaceName.RSVP_SECTION_MARK, PassageName.FOUR),
      new SessionPair(InterfaceName.RSVP_SECTION_MARK, PassageName.FIVE),
    ];
    service.generateSessionPair().subscribe((actualPair) => {
      expect(expectedPairs).toContain(actualPair);
    });

  });

  it('should process a pairing and remove from available', () => {
    let sessionPair = new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.FOUR);
    service.processSessionPair(sessionPair);
    expect(service.availableInterfaces).toEqual(jasmine.arrayWithExactContents([
      InterfaceName.BASELINE,
      InterfaceName.RSVP_BASIC,
      InterfaceName.RSVP_PROGRESS_BAR,
      InterfaceName.RSVP_SECTION_MARK
    ]));
    expect(service.availablePassages).toEqual(jasmine.arrayWithExactContents([
      PassageName.ONE,
      PassageName.TWO,
      PassageName.THREE,
      PassageName.FIVE,
    ]))
  });
});
