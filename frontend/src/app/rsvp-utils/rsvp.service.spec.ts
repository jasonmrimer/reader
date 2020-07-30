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

  it('should be created', inject([RSVPService], (service: RSVPService) => {
    expect(service).toBeTruthy();
  }));

  it('should prepare all the reading shapes and data on hydrate', () => {
    expect(service.readableContent).toEqual([
      'One', 'two.', 'Three.', 'Four,', 'five;', 'six!', 'Seven...', 'eight?'
    ])
    expect(service.percentRead()).toBe(0);
    expect(service.index).toBe(-1);
    expect(service.isComplete).toBeFalsy();
    expect(service.contentLength).toBe(8);
    expect(service.title).toBe('title01');
    expect(service.sectionMarkerIndexes).toEqual([0, 3]);
    expect(service.sectionMarkerPositions).toEqual([0, 37.5]);
    expect(service.quizRoute).toBe('rsvp-basic');
    expect(service.sections).toEqual([
      new Section(1, 0, 2, 0),
      new Section(2, 3, 7, 0)
    ]);
  });

  it('should return a pretty passage', () => {
    expect(service.prettyPassage()).toEqual(
      '\nOne two. Three.\n\nFour, five; six!\n\nSeven... eight?');
  });

  it('should calculate percent read', () => {
    service.contentLength = 8;
    service.moveAhead();
    service.moveAhead();
    expect(service.percentRead()).toBe(25);
  });

  it('should be completed at the end', () => {
    service.contentLength = 2;
    expect(service.isComplete).toBeFalse();
    service.moveAhead();
    service.moveAhead();
    expect(service.isComplete).toBeTrue();
  });

  it('should return current word', () => {
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
    expect(service.currentSectionRank).toBe(2);
  });

  it('should return percent read of current section', () => {
    expect(service.currentSectionCompletion).toBeCloseTo(-1, 0);
    service.moveAhead();
    expect(service.currentSectionCompletion).toBeCloseTo(33, 0);
    service.moveAhead();
    expect(service.currentSectionCompletion).toBeCloseTo(66.6, 0);
    service.moveAhead();
    expect(service.currentSectionCompletion).toBe(100);
    service.moveAhead();
    expect(service.currentSectionCompletion).toBe(20);
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    expect(service.currentSectionCompletion).toBe(100);
  });

  it('should return percent read of all sections', () => {
    expect(service.sections[0].percentRead).toBe(0);
    expect(service.sections[1].percentRead).toBe(0);
    service.moveAhead();
    expect(service.sections[0].percentRead).toBeCloseTo(33, 0);
    expect(service.sections[1].percentRead).toBe(0);
    service.moveAhead();
    expect(service.sections[0].percentRead).toBeCloseTo(66.6, 0);
    expect(service.sections[1].percentRead).toBe(0);
    service.moveAhead();
    expect(service.sections[0].percentRead).toBe(100);
    expect(service.sections[1].percentRead).toBe(0);
    service.moveAhead();
    expect(service.sections[0].percentRead).toBe(100);
    expect(service.sections[1].percentRead).toBe(20);
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    service.moveAhead();
    expect(service.sections[0].percentRead).toBe(100);
    expect(service.sections[1].percentRead).toBe(100);
  });

  it('should pause at punctuation', () => {
    expect(service.currentWord).toBe('');
    service.moveAhead();
    expect(service.currentWord).toBe('One');
    expect(service.calculatePauseAmount()).toBe(0);
    service.moveAhead();
    expect(service.currentWord).toBe('two.');
    expect(service.calculatePauseAmount()).toBe(500);
    service.moveAhead();
    expect(service.currentWord).toBe('Three.');
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
