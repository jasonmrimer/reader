import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReaderComponent } from '../reader/reader.component';
import { RsvpBasicComponent } from './rsvp-basic.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RSVPBasicComponent', () => {
  let component: RsvpBasicComponent;
  let fixture: ComponentFixture<RsvpBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ReaderComponent,],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
