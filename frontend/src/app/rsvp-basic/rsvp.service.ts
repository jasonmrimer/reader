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

  transformToRSVPWithSections(content: string): string[] {
    return this.removeLineBreaksAndArrayify(content);
  }

  transformToRSVPWithoutSections(content: string): string[] {
    content = content.replace(/#section-marker/g, '');
    return this.removeLineBreaksAndArrayify(content);
  }

  private removeLineBreaksAndArrayify(content: string): string[] {
    content = content.replace(/\n/g, ' ');
    content = content.trim();
    while (content.includes('  ')) {
      content = content.replace('  ', ' ');
    }
    return content.split(' ');
  }

  calculateSectionTicks(contentArray: string[]): number[] {
    let tick = 0;
    return contentArray
      .map((word: string) => {
        if (word === '#section-marker') {
          return tick++;
        }
      })
      .filter(isNotNullOrUndefined);
  }
}
