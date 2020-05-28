import { Injectable } from '@angular/core';
import { Passage } from '../passage/passage';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';

@Injectable()
export class RSVPService {

  constructor(private _http: HttpClient) {
  }

  getPassages() {
    return this._http.get<Passage[]>(`${environment.apiUrl}/passages`)
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
}
