import { Injectable } from '@angular/core';
import { Passage } from '../passage/passage';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
  readableContent: string[];
  constructor() {
  }

  hydrate(passage: Passage) {
    this.passage = passage;
    this.readableContent =
      this.transformToReadableContent(passage.content);
    this._contentLength = this.readableContent.length;
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

  index() {
    return this._index
  }

  moveAhead() {
    this._index++;
    if (this._index + 1 >= this._contentLength) {
      this._isComplete.next(true);
    }
  }

  get contentLength(): number {
    return this._contentLength;
  }

  get isComplete(): boolean {
    return this._index + 1 >= this._contentLength;
  }

  set contentLength(value: number) {
    this._contentLength = value;
  }

  percentRead() {
    return (this._index + 1) * 100 / this._contentLength;
  }
}
