import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRSVPComponent } from './basic-rsvp.component';

describe('BasicRSVPComponent', () => {
  let component: BasicRSVPComponent;
  let fixture: ComponentFixture<BasicRSVPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicRSVPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRSVPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
