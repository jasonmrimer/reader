import { TestBed } from '@angular/core/testing';

import { OrpService } from './orp.service';

describe('OrpService', () => {
  let service: OrpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should separate and align a word to its optimal recognition point', () => {
    testSeparationAndAlignment('a', ['', 'a', '']);
    testSeparationAndAlignment('ab', ['a', 'b', '']);
    testSeparationAndAlignment('abc', ['a', 'b', 'c']);
    testSeparationAndAlignment('abcd', ['a', 'b', 'cd']);
    testSeparationAndAlignment('abcde', ['a', 'b', 'cde']);
    testSeparationAndAlignment('abcdef', ['ab', 'c', 'def']);
    testSeparationAndAlignment('abcdefg', ['ab', 'c', 'defg']);
    testSeparationAndAlignment('abcdefgh', ['abc', 'd', 'efgh']);
    testSeparationAndAlignment('abcdefghi', ['abc', 'd', 'efghi']);
    testSeparationAndAlignment('abcdefghij', ['abcd', 'e', 'fghij']);
    testSeparationAndAlignment('abcdefghijk', ['abcd', 'e', 'fghijk']);
    testSeparationAndAlignment('abcdefghijkl', ['abcd', 'e', 'fghijkl']);
    testSeparationAndAlignment('abcdefghijklmnopqrstuv', ['abcd', 'e', 'fghijklmnopqrstuv']);
  });

  function testSeparationAndAlignment(
    word: string,
    expectedWordChunks: string[]
  ) {
    const textMeasurer = document.createElement('div');
    const textJoiner = document.createElement('div');
    const textElementLeft = document.createElement('div');
    const textElementCenter = document.createElement('div');
    const textElementRight = document.createElement('div');
    const textElements = {
      left: textElementLeft,
      center: textElementCenter,
      right: textElementRight
    };

    const newElements = service.separateAndAlign(word, textMeasurer, textElements, textJoiner);

    expect(newElements.textElements.left.textContent).toEqual(expectedWordChunks[0]);
    expect(newElements.textElements.center.textContent).toEqual(expectedWordChunks[1]);
    expect(newElements.textElements.right.textContent).toEqual(expectedWordChunks[2]);
  }
});
