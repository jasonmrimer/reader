import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpSubwayComponent } from './rsvp-subway.component';

describe('RsvpSubwayComponent', () => {
  let component: RsvpSubwayComponent;
  let fixture: ComponentFixture<RsvpSubwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpSubwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpSubwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
