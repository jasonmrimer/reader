// import { RsvpProgressBarComponent } from '../rsvp-progress-bar/rsvp-progress-bar.component';
// import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { ReaderComponent } from '../reader/reader.component';
// import { RSVPService } from './rsvp.service';
// import { RsvpBasicComponent } from './rsvp-basic.component';
//
// describe('RSVPProgressBarComponent', () => {
//   let component: RsvpBasicComponent;
//   let fixture: ComponentFixture<RsvpBasicComponent>;
//   let httpMock: HttpTestingController;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//       ],
//       declarations: [
//         RsvpProgressBarComponent,
//         ReaderComponent,
//       ],
//       providers: [
//         RSVPService
//       ]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(RsvpProgressBarComponent);
//     component = fixture.componentInstance;
//     component.readerService = new ReaderServiceMock();
//     fixture.detectChanges();
//
//     injector = getTestBed();
//     httpMock = injector.get(HttpTestingController);
//   });
//
//   afterEach(() => {
//     httpMock.verify();
//   })
