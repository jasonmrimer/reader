import { Injectable } from '@angular/core';
import { Passage } from '../passage/passage';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RSVPService {
  private _index = 0;
  private _contentLength = Number.MAX_SAFE_INTEGER;
  private _isComplete = new BehaviorSubject<boolean>(false);
  private passage: Passage;
  isComplete$ = this._isComplete.asObservable();
  private _readableContent: string[];
  private _title: string;
  private _sectionMarkerIndexes: number[];
  private _sectionMarkerPositions: number[];

  constructor() {
  }

  hydrate(passage: Passage) {
    this.passage = passage;
    this._readableContent =
      this.transformToReadableContent(passage.content);
    this._contentLength = this.readableContent.length;
    this._title = passage.title;
    this._sectionMarkerIndexes = this.calculateSectionMarkerIndexes(
      this.transformToRSVPWithSectionMarkers(passage.content)
    );
    this._sectionMarkerPositions = this.calculateRelativePositionsOfIndexes(
      this._sectionMarkerIndexes,
      this._contentLength
    );
  }

  transformToRSVPWithSectionMarkers(unformedContent: string): string[] {
    return this.removeLineBreaksAndArrayify(unformedContent);
  }

  transformToReadableContent(contentWithLineBreaksAndSectionMarkers: string): string[] {
    return this.removeLineBreaksAndArrayify(
      this.removeSectionMarkers(
        contentWithLineBreaksAndSectionMarkers
      )
    );
  }

  calculateSectionMarkerIndexes(content: string[]): number[] {
    let tick = 0;
    return content.map((word: string, index: number) => {
      if (word === '#section-marker') {
        return index - tick++;
      }
    }).filter(isNotNullOrUndefined);
  }

  calculateRelativePositionsOfIndexes(indexes: number[], contentLength: number) {
    return indexes.map((value: number) => {
      return value * 100 / contentLength;
    });
  }

  moveAhead() {
    this._index++;
    if (this._index + 1 >= this._contentLength) {
      this._isComplete.next(true);
    }
  }

  percentRead() {
    return (this._index + 1) * 100 / this._contentLength;
  }

  get contentLength(): number {
    return this._contentLength;
  }

  get currentWord(): string {
    return this._readableContent
      ? this._readableContent[this._index]
      : '';
  }

  get index() {
    return this._index
  }

  get isComplete(): boolean {
    return this._index + 1 >= this._contentLength;
  }

  get readableContent(): string[] {
    return this._readableContent;
  }

  get sectionMarkerIndexes(): number[] {
    return this._sectionMarkerIndexes;
  }

  get sectionMarkerPositions(): number[] {
    return this._sectionMarkerPositions;
  }

  get title(): string {
    return this._title;
  }

  set contentLength(value: number) {
    this._contentLength = value;
  }

  private removeSectionMarkers(contentWithSectionMarkers: string) {
    return contentWithSectionMarkers.replace(/#section-marker/g, '');
  }

  private removeLineBreaksAndArrayify(unformedContent: string): string[] {
    return this.conformToAllSingleSpaces(
      unformedContent
        .replace(/\n/g, ' ')
        .trim())
      .split(' ');
  }

  private conformToAllSingleSpaces(unformedContent: string) {
    while (unformedContent.includes('  ')) {
      unformedContent = unformedContent.replace('  ', ' ');
    }
    return unformedContent;
  }
}
