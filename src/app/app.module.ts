import { HttpClientModule } from '@angular/common/http';
import { EitherValidatorDirective } from './validator/eitherValidator';
import { NumberValidatorDirective } from './validator/numberValidator';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionComponent } from './section/section.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    NumberValidatorDirective,
    EitherValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
