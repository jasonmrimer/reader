import { Injectable } from '@angular/core';
import { Passage } from '../passage/passage';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RSVPService {

  constructor(private _http: HttpClient) {
  }

  getPassages() {
    return this._http.get<Passage[]>(`${environment.apiUrl}/passages`)
  }

  transformToRSVP(content: string) {
    content = content.replace(/\n/g, ' ');
    while (content.includes('  ')) {
      content = content.replace('  ', ' ');
    }
    return content.split(' ');
  }
}
