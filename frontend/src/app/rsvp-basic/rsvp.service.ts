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

  transformToRSVPWithSections(unformedContent: string): string[] {
    return this.removeLineBreaksAndArrayify(unformedContent);
  }

  transformToRSVPWithoutSections(unformedContent: string): string[] {
    unformedContent = unformedContent.replace(/#section-marker/g, '');
    return this.removeLineBreaksAndArrayify(unformedContent);
  }

  private removeLineBreaksAndArrayify(unformedContent: string): string[] {
    unformedContent = unformedContent.replace(/\n/g, ' ');
    unformedContent = unformedContent.trim();
    while (unformedContent.includes('  ')) {
      unformedContent = unformedContent.replace('  ', ' ');
    }
    return unformedContent.split(' ');
  }

  calculateSectionTicks(content: string[]): number[] {
    let tick = 0;
    return content
      .map((word: string, index: number) => {
        if (word === '#section-marker') {
          return index - tick++;
        }
      })
      .filter(isNotNullOrUndefined);
  }

  calculateTickPositions(content: string[]) {
    let sectionCount = 0;
    let sectionIndexes = content.map((word: string, index: number) => {
      if (word === '#section-marker') {
        sectionCount++;
        return index - (sectionCount - 1);
      }
    }).filter((element) => element !== undefined);
    content = content.filter((word) => word !== '#section-marker');
    return sectionIndexes.map((index: number) => {
      return index * 100 / content.length;
    });
  }}
