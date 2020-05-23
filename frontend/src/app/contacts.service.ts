import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Contacts } from './contacts/contacts';
import { environment } from '../environments/environment';

@Injectable()
export class ContactsService {

  constructor(private _http: HttpClient) { }

  //getting contacts through express rest api
  getContacts(){
    return this._http.get<Contacts[]>(`${environment.apiUrl}/contacts`);
  }

  //adding contact using express rest api
  addContact(newContact){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post<Contacts>(`${environment.apiUrl}/contacts`, newContact);
  }

    //deleting contact using express rest api
    deleteContact(id){
      return this._http.delete<Contacts>(`${environment.apiUrl}/contact/` + id);
    }

}
