import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Contacts } from './contacts/contacts';

@Injectable()
export class ContactsService {

  constructor(private _http: HttpClient) { }

  //getting contacts through express rest api
  getContacts(){
    return this._http.get<Contacts[]>('http://localhost:3000/api/contacts');
  }

  //adding contact using express rest api
  addContact(newContact){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this._http.post<Contacts>('http://localhost:3000/api/contacts', newContact);
  }

    //deleting contact using express rest api
    deleteContact(id){
      return this._http.delete<Contacts>('http://localhost:3000/api/contact/' + id);
    }

}
