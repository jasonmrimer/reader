import { inject, TestBed } from '@angular/core/testing';

import { RSVPService } from './rsvp.service';
import { passageStub } from './PassageStub';
import { MetricInterface } from '../metrics/metric';

describe('RSVPService', () => {
  let service: RSVPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RSVPService]
    });

    service = TestBed.inject(RSVPService);
    service.hydrate(passageStub, MetricInterface.RSVP_BASIC);
  });

  it('should be created', inject([RSVPService], (service: RSVPService) => {
    expect(service).toBeTruthy();
  }));

  it('should prepare all the reading shapes and data on hydrate', () => {
    expect(service.readableContent).toEqual([
      'One', 'two.', 'Three.', 'Four', 'five', 'six.', 'Seven', 'eight.'
    ])
    expect(service.percentRead()).toBe(12.5);
    expect(service.index).toBe(0);
    expect(service.isComplete).toBeFalsy();
    expect(service.contentLength).toBe(8);
    expect(service.title).toBe('title01');
    expect(service.sectionMarkerIndexes).toEqual([0, 3]);
    expect(service.sectionMarkerPositions).toEqual([0, 37.5]);
    expect(service.quizRoute).toBe('/quiz-rsvp-basic');
  });

  it('should transform passage content into RSVP shape', function () {
    expect(service.transformToReadableContent(passageStub.content)).toEqual([
      'One', 'two.', 'Three.', 'Four', 'five', 'six.', 'Seven', 'eight.'
    ]);
  });

  it('should transform passage content into RSVP shape and include section-markers', () => {
    expect(service.transformToRSVPWithSectionMarkers(passageStub.content)).toEqual([
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
    const transformedContent = service.transformToRSVPWithSectionMarkers(passageStub.content);
    expect(service.calculateSectionMarkerIndexes(transformedContent)).toEqual([0, 3]);
  });

  it('should calculate the percentage position of ticks based on index value within content', () => {
    const indexes = [0, 3];
    const contentLength = 8;
    expect(service.calculateRelativePositionsOfIndexes(indexes, contentLength)).toEqual([0, 37.5]);
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

  it('should return current word', () => {
    service.moveAhead();
    service.moveAhead();
    expect(service.currentWord).toBe('Three.');
  });

  it('should return a quiz route', () => {
    expect(service.quizRoute).toBe('/quiz-rsvp-basic');
    service.hydrate(passageStub, MetricInterface.RSVP_SECTION_MARK);
    expect(service.quizRoute).toBe('/quiz-rsvp-section-mark');
    service.hydrate(passageStub, MetricInterface.RSVP_PROGRESS_BAR);
    expect(service.quizRoute).toBe('/quiz-rsvp-progress-bar');
  });
});
