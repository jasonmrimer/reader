import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpContainerComponent } from './rsvp-container.component';
import { passageStub } from '../rsvp-basic/PassageStub';
import { PassageService } from '../passage/passage.service';
import { PassageServiceStub } from '../passage/passage-stub.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RSVPServiceStub } from '../rsvp-basic/rsvp-stub.service';
import { RSVPService } from '../rsvp-basic/rsvp.service';

describe('RsvpContainerComponent', () => {
  let component: RsvpContainerComponent;
  let fixture: ComponentFixture<RsvpContainerComponent>;

  beforeEach(async(() => {
    let passageService = new PassageServiceStub();
    let rsvpService = new RSVPServiceStub();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RsvpContainerComponent],
      providers: [
        {provide: PassageService, useValue: passageService},
        {provide: RSVPService, useValue: rsvpService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a passage on construction', () => {
    expect(component.passage).toEqual(passageStub);
  });

  it('should hydrate the rsvp service', () => {
    expect(component.rsvpService.hydrate).toHaveBeenCalledWith(passageStub);
  });
});
