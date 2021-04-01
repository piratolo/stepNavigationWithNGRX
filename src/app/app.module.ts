import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EitherValidatorDirective } from './validator/eitherValidator';
import { NumberValidatorDirective } from './validator/numberValidator';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionComponent } from './section/section.component';
import { FormsModule } from '@angular/forms';
import { TrustedContentPipe } from './pipe/trusted-content.pipe';
import { DEFAULT_TIMEOUT, RequestInterceptorService } from './service/request-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    NumberValidatorDirective,
    EitherValidatorDirective,
    TrustedContentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
              /****** RequestInterceptorService ******/
              { provide: HTTP_INTERCEPTORS, useClass : RequestInterceptorService, multi:true },
              { provide: DEFAULT_TIMEOUT, useValue: 180 /*durata timeout*/ }],
              /****** RequestInterceptorService ******/
  bootstrap: [AppComponent]
})
export class AppModule { }
