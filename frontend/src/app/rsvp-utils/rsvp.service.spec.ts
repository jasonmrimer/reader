import { inject, TestBed } from '@angular/core/testing';

import { RSVPService } from './rsvp.service';
import { passageStub } from './PassageStub';
import { Section } from './Section';
import { InterfaceName } from '../session/InterfaceName';

describe('RSVPService', () => {
  let service: RSVPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RSVPService]
    });

    service = TestBed.inject(RSVPService);
    service.hydrate(passageStub, InterfaceName.RSVP_BASIC);
  });

  it('should be created', inject([RSVPService], (s: RSVPService) => {
    expect(s).toBeTruthy();
  }));

  it('should prepare all the reading shapes and data on hydrate', () => {
    expect(service.readableContent).toEqual([
      '-Section_1-', 'One', 'two.', 'Three.', '-Section_2-', 'Four,', 'five;', 'six!', 'Seven...', 'eight?'
    ]);
    expect(service.percentRead()).toBe(0);
    expect(service.currentPassageIndex).toBe(-1);
    expect(service.isCompleteSubject).toBeFalsy();
    expect(service.contentLength).toBe(10);
    expect(service.title).toBe('title01');
    expect(service.sectionMarkerIndexes).toEqual([0, 4]);
    expect(service.sectionMarkerPositions).toEqual([0, 40, 100]);
    expect(service.quizRoute).toBe('rsvp-basic');
    expect(service.sections).toEqual([
      new Section(1, 0, 3, 0),
      new Section(2, 4, 9, 0)
    ]);
  });

  xit('should return a pretty passage', () => {
    expect(service.prettyPassage()).toEqual(
      '\n-Section_1-\nOne two. Three.\n\n-Section_2-\nFour, five; six!\n\nSeven... eight?');
  });

  it('should calculate percent read', () => {
    service.contentLength = 8;
    service.moveAhead();
    service.moveAhead();
    expect(service.percentRead()).toBe(25);
  });

  it('should start with a blank and be completed after moving to the end', () => {
    expect(service.isCompleteSubject).toBeFalse();

    service.moveAhead();
    for (let i = 0; i < service.contentLength; i++) {
      service.moveAhead();
    }

    expect(service.isCompleteSubject).toBeTrue();
  });

  it('should return current word', () => {
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    expect(service.currentWord).toBe('Three.');
  });

  it('should return a quiz route', () => {
    expect(service.quizRoute).toBe('rsvp-basic');
    service.hydrate(passageStub, InterfaceName.RSVP_SECTION_MARK);
    expect(service.quizRoute).toBe('rsvp-section-mark');
    service.hydrate(passageStub, InterfaceName.RSVP_PROGRESS_BAR);
    expect(service.quizRoute).toBe('rsvp-progress-bar');
  });

  it('should collect sections with word counts', () => {
    expect(service.sectionLengths).toEqual([3, 5]);
  });

  it('should get the current section based on progress', () => {
    expect(service.currentSectionRank).toBe(-1);
    service.moveAhead();
    expect(service.currentSectionRank).toBe(1);
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    expect(service.currentSectionRank).toBe(2);
  });

  xit('should return percent read of current section', () => {
    expect(service.currentSectionPercentComplete).toBe(0, 0);
    service.moveAhead();
    expect(service.currentSectionPercentComplete).toBe(0, 0);
    service.moveAhead();
    expect(service.currentSectionPercentComplete).toBeCloseTo(33, 0);
    service.moveAhead();
    expect(service.currentSectionPercentComplete).toBeCloseTo(66.6, 0);
    service.moveAhead();
    expect(service.currentSectionPercentComplete).toBe(0);
    service.moveAhead();
    expect(service.currentSectionPercentComplete).toBe(0);
    service.moveAhead();
    expect(service.currentSectionPercentComplete).toBe(20);
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    expect(service.currentSectionPercentComplete).toBe(100);
    service.moveAhead();
  });

  it('should return percent read of all sections', () => {
    expect(service.currentWord).toBe('');
    expect(service.sections[0].percentRead).toBe(0);
    expect(service.sections[1].percentRead).toBe(0);

    service.moveAhead();
    expect(service.currentWord).toBe('-Section_1-');
    expect(service.sections[0].percentRead).toBe(0);
    expect(service.sections[1].percentRead).toBe(0);

    service.moveAhead();
    expect(service.currentWord).toBe('One');
    expect(service.sections[0].percentRead).toBeCloseTo(33, 0);
    expect(service.sections[1].percentRead).toBe(0);

    service.moveAhead();
    expect(service.currentWord).toBe('two.');
    expect(service.sections[0].percentRead).toBeCloseTo(66.6, 0);
    expect(service.sections[1].percentRead).toBe(0);

    service.moveAhead();
    expect(service.currentWord).toBe('Three.');
    expect(service.sections[0].percentRead).toBe(100);
    expect(service.sections[1].percentRead).toBe(0);

    service.moveAhead();
    expect(service.currentWord).toBe('-Section_2-');
    expect(service.sections[0].percentRead).toBe(100);
    expect(service.sections[1].percentRead).toBe(0);
    service.moveAhead();
    expect(service.currentWord).toBe('Four,');
    expect(service.sections[0].percentRead).toBe(100);
    expect(service.sections[1].percentRead).toBe(20);
    service.moveAhead();
    expect(service.currentWord).toBe('five;');
    service.moveAhead();
    expect(service.currentWord).toBe('six!');
    service.moveAhead();
    expect(service.currentWord).toBe('Seven...');
    service.moveAhead();
    expect(service.sections[0].percentRead).toBe(100);
    expect(service.sections[1].percentRead).toBe(100);
    expect(service.currentWord).toBe('eight?');
  });

  it('should pause at punctuation', () => {
    expect(service.currentWord).toBe('');
    service.moveAhead();
    expect(service.currentWord).toBe('-Section_1-');
    expect(service.calculatePauseAmount()).toBe(1000);
    service.moveAhead();
    expect(service.currentWord).toBe('One');
    expect(service.calculatePauseAmount()).toBe(0);
    service.moveAhead();
    expect(service.currentWord).toBe('two.');
    expect(service.calculatePauseAmount()).toBe(500);
    service.moveAhead();
    expect(service.currentWord).toBe('Three.');
    expect(service.calculatePauseAmount()).toBe(500);
    service.moveAhead();
    expect(service.currentWord).toBe('-Section_2-');
    expect(service.calculatePauseAmount()).toBe(1000);
    service.moveAhead();
    expect(service.currentWord).toBe('Four,');
    expect(service.calculatePauseAmount()).toBe(400);
    service.moveAhead();
    expect(service.currentWord).toBe('five;');
    expect(service.calculatePauseAmount()).toBe(400);
    service.moveAhead();
    expect(service.currentWord).toBe('six!');
    expect(service.calculatePauseAmount()).toBe(500);
    service.moveAhead();
    expect(service.currentWord).toBe('Seven...');
    expect(service.calculatePauseAmount()).toBe(500);
    service.moveAhead();
    expect(service.currentWord).toBe('eight?');
    expect(service.calculatePauseAmount()).toBe(500);
    service.moveAhead();
  });
});
