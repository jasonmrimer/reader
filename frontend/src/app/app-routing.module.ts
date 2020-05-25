import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassageComponent } from './passage/passage.component';
import { RsvpBasicComponent } from './rsvp-basic/rsvp-basic.component';
import { RsvpProgressBarComponent } from './rsvp-progress-bar/rsvp-progress-bar.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'baseline', component: PassageComponent},
  {path: 'rsvp-basic', component: RsvpBasicComponent},
  {path: 'rsvp-progress-bar', component: RsvpProgressBarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
