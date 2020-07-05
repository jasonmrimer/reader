import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Passage } from './passage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassageService {

  constructor(private _http: HttpClient) {
  }

  getPassages() {
    return this._http.get<Passage[]>(`${environment.apiUrl}/passages`)
  }

  getPassage(passageId: number) {
    let params = new HttpParams().set('passageId', String(passageId));
    return this._http.get<Passage>(
      `${environment.apiUrl}/passages`,
      {params: params}
    )
  }
}
