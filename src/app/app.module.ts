import { RoutingModule } from './routing/routing.module';
import { SchemaDetailComponent } from './model/schema-detail/schema-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EitherValidatorDirective } from './validator/eitherValidator';
import { NumberValidatorDirective } from './validator/numberValidator';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionComponent } from './section/section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrustedContentPipe } from './pipe/trusted-content.pipe';
import { DEFAULT_TIMEOUT, RequestInterceptorService } from './service/request-interceptor.service';
import { ModalComponent, NgbdModalContent } from './bootstrap/modal/modal.component';
import { DetailTypeDirective } from './directive/detail-type.directive';
import { FieldDetailComponent } from './model/field-detail/field-detail.component';
import { CounterComponent } from './counter/counter.component';
import { NgbdCollapseBasic } from './bootstrap/collapse-basic/collapse-basic.component';
import { ApplicationFormComponent } from './form/application-form/application-form.component';
import { ElementPerPageComponent } from './element-per-page/element-per-page.component';
import { ApplicationTableComponent } from './application-table/application-table.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    NumberValidatorDirective,
    EitherValidatorDirective,
    TrustedContentPipe,
    ModalComponent,
    NgbdModalContent,
    SchemaDetailComponent,
    DetailTypeDirective,
    FieldDetailComponent,
    CounterComponent,
    NgbdCollapseBasic,
    ApplicationFormComponent,
    ElementPerPageComponent,
    ApplicationTableComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [NgbActiveModal,
              /****** RequestInterceptorService ******/
              { provide: HTTP_INTERCEPTORS, useClass : RequestInterceptorService, multi:true },
              { provide: DEFAULT_TIMEOUT, useValue: 30000 /*durata timeout*/ }],
              /****** RequestInterceptorService ******/
  bootstrap: [AppComponent]
})
export class AppModule { }
