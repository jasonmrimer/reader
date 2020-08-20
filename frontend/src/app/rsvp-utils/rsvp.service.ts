import { Injectable } from '@angular/core';
import { Passage } from './passage';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { Subject } from 'rxjs';
import { Section, SECTION_META_NON_CONTENT_LENGTH } from './Section';
import { InterfaceName } from '../session/InterfaceName';

@Injectable({
  providedIn: 'root'
})
export class RSVPService {

  get contentLength(): number {
    return this._contentLength;
  }

  get currentSectionRank(): number {
    const section = this.currentSection;
    return section ? section.rank : -1;
  }

  get currentSection(): Section {
    if (!this._sections) {
      return null;
    }

    return this._sections.find((sect) => {
      return sect.start <= this._currentPassageIndex && this._currentPassageIndex <= sect.end;
    });
  }

  get currentWord(): string {
    return this.currentPassageIndex > -1
      ? this._readableContent[this._currentPassageIndex]
      : '';
  }

  get currentPassageIndex() {
    return this._currentPassageIndex;
  }

  get isCompleteSubject(): boolean {
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

  get currentSectionPercentComplete() {
    const section = this.currentSection;
    if (!section) {
      return 0;
    }
    return this.calculateCompletionPercentage(section);
  }

  private _contentLength = Number.MAX_SAFE_INTEGER;
  private _currentPassageIndex = -1;
  private _interfaceType: InterfaceName;
  private _isCompleteSubject;
  private _isComplete = false;
  isComplete$;
  private _passage: Passage;
  private _readableContent: string[];
  private _sections: Section[] = [];
  private _sectionLengths: number[];
  private _sectionMarkerIndexes: number[];
  private _sectionMarkerPositions: number[];
  private _title: string;

  private static removeSectionMarkers(contentWithSectionMarkers: string) {
    return contentWithSectionMarkers.replace(/#section-marker/g, '');
  }

  private static conformToAllSingleSpaces(unformedContent: string) {
    while (unformedContent.includes('  ')) {
      unformedContent = unformedContent.replace('  ', ' ');
    }
    return unformedContent;
  }

  private static removeLineBreaksAndArrayify(unformedContent: string): string[] {
    return RSVPService.conformToAllSingleSpaces(
      unformedContent
        .replace(/\n/g, ' ')
        .trim())
      .split(' ');
  }

  private static removeLeadingLineBreak(content: string) {
    return content.replace('\n', '');
  }

  hydrate(passage: Passage, interfaceType: InterfaceName) {
    this._currentPassageIndex = -1;
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
    return RSVPService.removeLineBreaksAndArrayify(unformedContent);
  }

  transformToReadableContent(contentWithLineBreaksAndSectionMarkers: string): string[] {
    return RSVPService.removeLineBreaksAndArrayify(
      RSVPService.removeSectionMarkers(
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

  calculateRelativePositionsOfIndexes(indexes: number[], contentLength: number): number[] {
    const positions = indexes.map((value: number) => {
      return value * 100 / contentLength;
    });
    positions.push(100);
    return positions;
  }

  moveAhead() {
    if (this._currentPassageIndex === this._contentLength - 1) {
      this._isComplete = true;
      this._isCompleteSubject.next(true);
      return;
    }
    this._currentPassageIndex++;
    this.updateSections();
  }

  percentRead() {
    return (this._currentPassageIndex + 1) * 100 / this._contentLength;
  }

  private calculateSectionLengths(
    sectionMarkerIndexes: number[],
    contentLength: number
  ) {
    return sectionMarkerIndexes.map((positionInPassage, index) => {
      if (this.isLast(index, sectionMarkerIndexes)) {
        return contentLength - (SECTION_META_NON_CONTENT_LENGTH * index) - positionInPassage;
      }
      return sectionMarkerIndexes[index + 1] - positionInPassage - SECTION_META_NON_CONTENT_LENGTH;
    });
  }

  private isLast(index: number, sectionMarkerIndexes: number[]) {
    return index === sectionMarkerIndexes.length - 1;
  }

  private extractSections(sectionMarkerIndexes: number[], contentLength: number) {
    const actualContentLengths = this.calculateSectionLengths(sectionMarkerIndexes, contentLength);
    return sectionMarkerIndexes.map((positionInPassage, index) => {
      return new Section(
        index + 1,
        positionInPassage,
        positionInPassage + actualContentLengths[index] + 1,
        0
      );
    });
  }

  private calculateCompletionPercentage(section: Section) {
    const completedPortion = this._currentPassageIndex - section.start + 1 - SECTION_META_NON_CONTENT_LENGTH;
    const percent = completedPortion / section.length * 100;
    return percent > 100 ? 100 : percent;
  }

  private updateSections() {
    const section = this.currentSection;
    if (!section) {
      return;
    }
    if (this.currentSection.rank > 1 && this.currentSection.percentRead === 0) {
      this.markComplete(this.previousSection(this.currentSection));
    }
    section.percentRead = this.calculateCompletionPercentage(section);
  }

  calculatePauseAmount() {
    const lastLetter = this.currentWord[this.currentWord.length - 1];

    const isSectionBreak = () => {
      return this.currentWord.includes('-Section_');
    };

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
    return RSVPService.removeLeadingLineBreak(
      RSVPService.removeSectionMarkers(this._passage.content)
    );
  }

  private previousSection(currentSection: Section) {
    const index = this._sections.findIndex((s) => s === currentSection) - 1;
    return this.sections[index];
  }

  private markComplete(section: Section) {
    section.percentRead = 100;
  }
}
