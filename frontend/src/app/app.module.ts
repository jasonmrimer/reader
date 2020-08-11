import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BaselineComponent } from './baseline/baseline.component';
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
import { SubwayComponent } from './rsvp-subway/subway/subway.component';
import { PassageCompletionComponent } from './quiz/passage-completion/passage-completion.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { OutroComponent } from './outro/outro.component';
import {MatSliderModule} from "@angular/material/slider";
import {Ng5SliderModule} from "ng5-slider";

@NgModule({
  declarations: [
    AppComponent,
    BaselineComponent,
    RsvpBasicComponent,
    ReaderComponent,
    RsvpProgressBarComponent,
    HomeComponent,
    RsvpSectionMarksComponent,
    QuizComponent,
    MetricsComponent,
    RsvpComponent,
    RsvpSubwayComponent,
    CytoscapeComponent,
    SubwayComponent,
    PassageCompletionComponent,
    InstructionsComponent,
    OutroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgxBootstrapSliderModule,
    MatSliderModule,
    Ng5SliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
