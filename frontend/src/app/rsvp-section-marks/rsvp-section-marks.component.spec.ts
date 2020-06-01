import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { RsvpSectionMarksComponent } from './rsvp-section-marks.component';
import { passagesStub, passageStub } from '../rsvp-basic/PassageStub';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RsvpSectionMarksComponent', () => {
  let component: RsvpSectionMarksComponent;
  let fixture: ComponentFixture<RsvpSectionMarksComponent>;

  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RsvpSectionMarksComponent],
      providers: [RSVPService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpSectionMarksComponent);
    component = fixture.componentInstance;
    component.passage = passageStub;
    fixture.detectChanges();
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  function mockGet() {
    const request = httpMock.expectOne('http://localhost:4000/api/passages');
    expect(request.request.method).toBe('GET');
    request.flush(passagesStub);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
    mockGet();
  });

  it('should set percentage position of ticks based on section-mark in text', () => {
    expect(component.tickPositions).toEqual([0, 37.5]);
    mockGet();
  });
});
