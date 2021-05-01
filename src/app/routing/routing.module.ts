import { CanDeactivateGuardService } from './../service/can-deactivate-guard.service';
import { IndexComponent } from './../index/index.component';
import { RouteGuardService } from './../service/route-guard.service';
import { MainComponent } from './../main/main.component';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';

const routes:Routes = [
  {
    path: "",
    redirectTo : "index",
    pathMatch : "full"
  },
  {
    path: "index",
    component: IndexComponent,
  },
  {
    path: "console",
    component: MainComponent,
    canActivate: [RouteGuardService],
    canDeactivate: [CanDeactivateGuardService]
  },
  {
    path:'login',
    component: AuthComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [RouteGuardService]
})
export class RoutingModule { }
