import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passage } from './passage';
import { environment } from '../../environments/environment';

@Injectable()
export class PassageService {

  constructor(private _http: HttpClient) {
  }

  getPassages() {
    return this._http.get<Passage[]>(`${environment.apiUrl}/passages`)
  }
}
