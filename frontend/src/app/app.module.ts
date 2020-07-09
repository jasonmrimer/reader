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
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { QuizComponent } from './quiz/quiz.component';
import { MetricsComponent } from './metrics/metrics.component';
import { RsvpComponent } from './rsvp-utils/rsvp.component';
import { RsvpSubwayComponent } from './rsvp-subway/rsvp-subway.component';
import { CytoscapeComponent } from './rsvp-subway/cytoscape.component';

@NgModule({
  declarations: [
    AppComponent,
    PassageComponent,
    RsvpBasicComponent,
    ReaderComponent,
    RsvpProgressBarComponent,
    HomeComponent,
    RsvpSectionMarksComponent,
    QuizComponent,
    MetricsComponent,
    RsvpComponent,
    RsvpSubwayComponent,
    CytoscapeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgxBootstrapSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
