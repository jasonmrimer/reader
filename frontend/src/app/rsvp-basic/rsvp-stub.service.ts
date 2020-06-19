import { Injectable } from '@angular/core';
import { RSVPService } from './rsvp.service';
import createSpy = jasmine.createSpy;

@Injectable({
  providedIn: 'root'
})
export class RSVPServiceStub extends RSVPService {
  hydrate = createSpy();
}
