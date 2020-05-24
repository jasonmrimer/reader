import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PassageComponent } from './passage/passage.component';
import { AppRoutingModule } from './app-routing.module';
import { BasicRSVPComponent } from './basic-rsvp/basic-rsvp.component';

@NgModule({
  declarations: [
    AppComponent,
    PassageComponent,
    BasicRSVPComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
