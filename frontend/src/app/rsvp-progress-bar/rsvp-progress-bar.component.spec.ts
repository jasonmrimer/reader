import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { RsvpProgressBarComponent } from './rsvp-progress-bar.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReaderComponent } from '../reader/reader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { ReaderService } from '../reader/reader.service';
import { passagesStub, passageStub } from '../rsvp-basic/PassageStub';
import { RSVPService } from '../rsvp-basic/rsvp.service';

class ReaderServiceMock extends ReaderService {
  index(): number {
    return 3;
  }
}

describe('RSVPProgressBarComponent', () => {
  let component: RsvpProgressBarComponent;
  let fixture: ComponentFixture<RsvpProgressBarComponent>;

  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatProgressBarModule
      ],
      declarations: [
        RsvpProgressBarComponent,
        ReaderComponent,
      ],
      providers: [
        RSVPService
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpProgressBarComponent);
    component = fixture.componentInstance;
    component.readerService = new ReaderServiceMock();
    fixture.detectChanges();

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', async () => {
    await expect(component).toBeTruthy();

    const request = httpMock.expectOne('http://localhost:4000/api/passages');
    expect(request.request.method).toBe('GET');
    request.flush(passagesStub);
  });

  it('should have a progress bar', async () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let completionMeter = fixture.debugElement.query(By.css('#completion-meter'));
      expect(completionMeter).toBeTruthy();
      expect(completionMeter.attributes['aria-valuenow']).toBe('37.5');
    })

    const request = httpMock.expectOne('http://localhost:4000/api/passages');
    expect(request.request.method).toBe('GET');
    request.flush(passagesStub);
  });
});
