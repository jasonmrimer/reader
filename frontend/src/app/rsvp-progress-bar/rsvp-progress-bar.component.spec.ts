import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpProgressBarComponent } from './rsvp-progress-bar.component';

describe('RSVPProgressBarComponent', () => {
  let component: RsvpProgressBarComponent;
  let fixture: ComponentFixture<RsvpProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
