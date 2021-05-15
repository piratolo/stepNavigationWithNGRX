import * as AuthActions from './auth/store/auth.actions';
import { AuthService } from './service/auth.service';
import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  constructor(
    private authService:AuthService,
    private store:Store<fromApp.AppState>){;
  }



  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
     //this.authService.autoLogin();
  }

}
