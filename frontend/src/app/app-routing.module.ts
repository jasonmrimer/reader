import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassageComponent } from './passage/passage.component';
import { BasicRSVPComponent } from './basic-rsvp/basic-rsvp.component';

const routes: Routes = [
  { path: '', component: BasicRSVPComponent },
  { path: 'baseline', component: PassageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
