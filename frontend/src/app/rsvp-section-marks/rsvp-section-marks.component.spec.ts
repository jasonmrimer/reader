import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpSectionMarksComponent } from './rsvp-section-marks.component';

describe('RsvpSectionMarksComponent', () => {
  let component: RsvpSectionMarksComponent;
  let fixture: ComponentFixture<RsvpSectionMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpSectionMarksComponent ]
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
