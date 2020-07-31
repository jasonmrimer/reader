import { Injectable } from '@angular/core';
import { Passage } from './passage';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { BehaviorSubject, Subject } from 'rxjs';
import { Section } from './Section';
import { InterfaceName } from '../session/InterfaceName';

@Injectable({
  providedIn: 'root'
})
export class RSVPService {
  private _contentLength = Number.MAX_SAFE_INTEGER;
  private _index = -1;
  private _interfaceType: InterfaceName;
  private _isCompleteSubject;
  private _isComplete: boolean = false;
  isComplete$;
  private _passage: Passage;
  private _readableContent: string[];
  private _sections: Section[] = [];
  private _sectionLengths: number[];
  private _sectionMarkerIndexes: number[];
  private _sectionMarkerPositions: number[];
  private _title: string;

  hydrate(passage: Passage, interfaceType: InterfaceName) {
    this._index = -1;
    this._isComplete = false;
    this._isCompleteSubject = new Subject();
    this.isComplete$ = this._isCompleteSubject.asObservable();

    this._passage = passage;
    this._readableContent = this.transformToReadableContent(passage.content);
    this._contentLength = this.readableContent.length;
    this._title = passage.title;
    this._sectionMarkerIndexes = this.calculateSectionMarkerIndexes(
      this.transformToRSVPWithSectionMarkers(passage.content)
    );
    this._sectionMarkerPositions = this.calculateRelativePositionsOfIndexes(
      this._sectionMarkerIndexes,
      this._contentLength
    );
    this._interfaceType = interfaceType;
    this._sectionLengths = this.calculateSectionLengths(
      this._sectionMarkerIndexes,
      this._contentLength
    );

    this._sections = this.extractSections(this._sectionMarkerIndexes, this._contentLength);
    this.updateSections();
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
    if (this._index === this._contentLength - 1) {
      this._isComplete = true;
      this._isCompleteSubject.next(true);
      return;
    }
    this._index++;
    this.updateSections();
  }

  percentRead() {
    return (this._index + 1) * 100 / this._contentLength;
  }

  get contentLength(): number {
    return this._contentLength;
  }

  get currentSectionRank(): number {
    let section = this.currentSection;
    return section ? section.rank : -1;
  }

  get currentSection(): Section {
    if (!this._sections) {
      return null;
    }

    let section = this._sections.find((section) => {
      return section.start <= this._index && this._index <= section.end;
    });
    return section;
  }

  get currentWord(): string {
    return this.index > -1
      ? this._readableContent[this._index]
      : '';
  }

  get index() {
    return this._index
  }

  get isCompleteSubject(): boolean {
    // return this._index + 1 >= this._contentLength ;
    return this._isComplete;
  }

  get passage(): Passage {
    return this._passage;
  }

  get quizRoute(): string {
    return this._interfaceType.replace(/ /g, '-').toLowerCase();
  }

  get readableContent(): string[] {
    return this._readableContent;
  }

  get sections(): Section[] {
    return this._sections;
  }

  get sectionLengths(): number[] {
    return this._sectionLengths;
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

  private calculateSectionLengths(
    sectionMarkerIndexes: number[],
    contentLength: number
  ) {
    return sectionMarkerIndexes.map((position, index) => {
      if (index === sectionMarkerIndexes.length - 1) {
        return contentLength - position;
      }
      return sectionMarkerIndexes[index + 1] - position;
    })
  }

  private extractSections(sectionMarkerIndexes: number[], contentLength: number) {
    let lengths = this.calculateSectionLengths(sectionMarkerIndexes, contentLength);
    return sectionMarkerIndexes.map((position, index) => {
      return new Section(index + 1, position, position + lengths[index] - 1, 0);
    });
  }

  get currentSectionCompletion() {
    let section = this.currentSection;
    if (!section) {
      return -1;
    }
    return this.calculateCompletionPercentage(section);
  }

  private calculateCompletionPercentage(section: Section) {
    let complete = this._index - section.start + 1;
    return complete / section.length * 100;
  }

  private updateSections() {
    let section = this.currentSection;
    if (!section) {
      return;
    }
    section.percentRead = this.calculateCompletionPercentage(section);
  }


  calculatePauseAmount() {

    let lastLetter = this.currentWord[this.currentWord.length - 1];

    let isSectionBreak = () => {
      return this._sectionMarkerIndexes.includes(this._index + 1);
    }

    function isEndingPunctuation() {
      return lastLetter === '.' || lastLetter === '!' || lastLetter === '?' || lastLetter === '...';
    }

    function isMiddlePunctuation() {
      return lastLetter === ',' || lastLetter === ';';
    }

    if (isSectionBreak()) {
      return 1000;
    } else if (isEndingPunctuation()) {
      return 500;
    } else if (isMiddlePunctuation()) {
      return 400;
    }
    return 0;
  }

  prettyPassage() {
    return this.removeSectionMarkers(this._passage.content);
  }
}
