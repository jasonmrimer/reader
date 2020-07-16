import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaselineComponent } from './passage/baseline.component';
import { RsvpBasicComponent } from './rsvp-basic/rsvp-basic.component';
import { RsvpProgressBarComponent } from './rsvp-progress-bar/rsvp-progress-bar.component';
import { HomeComponent } from './home/home.component';
import { RsvpSectionMarksComponent } from './rsvp-section-marks/rsvp-section-marks.component';
import { QuizComponent } from './quiz/quiz.component';
import { MetricsComponent } from './metrics/metrics.component';
import { RsvpSubwayComponent } from './rsvp-subway/rsvp-subway.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'baseline/:passageId', component: BaselineComponent},
  {path: 'rsvp-basic/:passageId', component: RsvpBasicComponent},
  {path: 'rsvp-progress-bar/:passageId', component: RsvpProgressBarComponent},
  {path: 'rsvp-section-mark/:passageId', component: RsvpSectionMarksComponent},
  {path: 'rsvp-subway/:passageId', component: RsvpSubwayComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'quiz/:interfaceName', component: QuizComponent},
  {path: 'metrics', component: MetricsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
