import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PassageComponent } from './passage/passage.component';
import { AppRoutingModule } from './app-routing.module';
import { RsvpBasicComponent } from './rsvp-basic/rsvp-basic.component';
import { ReaderComponent } from './reader/reader.component';
import { RsvpProgressBarComponent } from './rsvp-progress-bar/rsvp-progress-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HomeComponent } from './home/home.component';
import { RsvpSectionMarksComponent } from './rsvp-section-marks/rsvp-section-marks.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    PassageComponent,
    RsvpBasicComponent,
    ReaderComponent,
    RsvpProgressBarComponent,
    HomeComponent,
    RsvpSectionMarksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
