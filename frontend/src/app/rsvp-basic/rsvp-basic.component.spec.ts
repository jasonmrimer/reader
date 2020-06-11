import { RsvpProgressBarComponent } from '../rsvp-progress-bar/rsvp-progress-bar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReaderComponent } from '../reader/reader.component';
import { RSVPService } from './rsvp.service';
import { RsvpBasicComponent } from './rsvp-basic.component';
import { PassageService } from '../passage/passage.service';
import { PassageServiceStub } from '../passage/passage-stub.service';

describe('RSVPBasicComponent', () => {
  let component: RsvpBasicComponent;
  let fixture: ComponentFixture<RsvpBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        RsvpProgressBarComponent,
        ReaderComponent,
      ],
      providers: [
        RSVPService,
        {provide: PassageService, useValue: new PassageServiceStub()}
      ]
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

  it('should control an reader component', () => {
    expect(fixture.nativeElement.querySelector('app-reader')).not.toBe(null);
  });
});
