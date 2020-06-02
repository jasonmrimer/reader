import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpSectionMarksComponent } from './rsvp-section-marks.component';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RsvpSectionMarksComponent', () => {
  let component: RsvpSectionMarksComponent;
  let fixture: ComponentFixture<RsvpSectionMarksComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
