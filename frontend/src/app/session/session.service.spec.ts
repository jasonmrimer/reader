import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { AllInterfaces, InterfaceName } from './InterfaceName';
import { AllPassages, PassageName } from './PassageName';
import { SessionPair } from './SessionPair';
import { MetricsServiceStub } from '../metrics/metrics-stub.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('SessionService', () => {
  let service: SessionService;
  let routerSpy;

  beforeEach(() => {
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
    service.hydrate(new MetricsServiceStub(), routerSpy);
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
    const sessionPair = new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.FOUR);
    service.makeSessionPairUnavailable(sessionPair);
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
    ]));
  });

  it('should generate a random, least-used starting from session availability', () => {
    const sessionPair = new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.FOUR);
    service.makeSessionPairUnavailable(sessionPair);
    for (let i = 0; i < 100; i++) {
      service.generateSessionPair().subscribe((pair) => {
        expect(pair.interfaceName).toBe(InterfaceName.RSVP_SECTION_MARK);
      });
    }
  });

  function removeAllAvailableExceptOne() {
    const sessionPairsToRemove = [
      new SessionPair(InterfaceName.BASELINE, PassageName.ONE),
      new SessionPair(InterfaceName.RSVP_BASIC, PassageName.TWO),
      new SessionPair(InterfaceName.RSVP_SECTION_MARK, PassageName.THREE),
      new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.FIVE),
    ];
    sessionPairsToRemove.map((pair) => service.makeSessionPairUnavailable(pair));
  }

  it('should allow user to take non-least used if only remaining interfaces for session', () => {
    removeAllAvailableExceptOne();

    service.generateSessionPair().subscribe((pair) => {
      const expectedPair = new SessionPair(InterfaceName.RSVP_PROGRESS_BAR, PassageName.FOUR);
      expect(pair).toEqual(expectedPair);
      expect(service.currentPair).toEqual(expectedPair);
    });
  });

  it('should stop the user from continuing if completed all interfaces/passages', () => {
    expect(service.completedSession).toBeFalsy();
    const sessionPairsToRemove = [
      new SessionPair(InterfaceName.BASELINE, PassageName.ONE),
      new SessionPair(InterfaceName.RSVP_BASIC, PassageName.TWO),
      new SessionPair(InterfaceName.RSVP_SECTION_MARK, PassageName.THREE),
      new SessionPair(InterfaceName.RSVP_PROGRESS_BAR, PassageName.FOUR),
      new SessionPair(InterfaceName.RSVP_SUBWAY, PassageName.FIVE),
    ];
    sessionPairsToRemove.map((pair) => service.makeSessionPairUnavailable(pair));
    expect(service.completedSession).toBeTruthy();
  });

  it('should remove the current pair from available and clear current pair', () => {
    service.generateSessionPair().subscribe((pair) => {
      service.completeCurrentPair();
      expect(service.availableInterfaces).not.toContain(pair.interfaceName);
      expect(service.availablePassages).not.toContain(pair.passageName);
    });
  });

  it('should route to the next location', () => {
    removeAllAvailableExceptOne();
    service.navigateToPassage();

    expect(routerSpy.navigate).toHaveBeenCalledWith(
      [`/${InterfaceName.RSVP_PROGRESS_BAR}/${PassageName.FOUR}`]
    );
  });
});
