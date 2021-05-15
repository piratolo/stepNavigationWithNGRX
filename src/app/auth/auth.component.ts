import { Subject, Observable, Subscription } from 'rxjs';
import { User } from './../model/user.model';
import { IUser } from './../interface/IUser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandler } from './../error/errorHandler';
import { AuthService } from './../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized, ActivatedRouteSnapshot } from '@angular/router';
import { filter, pairwise, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit, OnDestroy {

  user:User = null;

  loginForm:FormGroup;
  errorHandler: ErrorHandler;

  notAuthorizeMessage:string = "";

  private userSub:Subscription;
  private loginSub:Subscription;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
   this.authService.setRedirectUrl(this.router.url);

    this.loginForm = this.formBuilder.group({
      "user" : ["", [Validators.required, Validators.pattern("[a-zA-Z@0-9]*")]],
      "password" : ["",  [Validators.required, Validators.pattern("[a-zA-Z@0-9]*")]]
    });
    this.errorHandler = new ErrorHandler();

    /**facciamo lo subscribe alla proprietà "auth" dello state, che  sarà modifica dal codice
       * precesente nella funzione onSubmit, che avvia il login */
     this.loginSub = this.store.select('auth').subscribe(authstate => {
       this.user = authstate.user;
       if(authstate.authError){
        this.errorHandler.showError(this.modalService, new Error(authstate.authError));
       }
    });

    this.authService.notAuthorize.subscribe(notAuthorize => {
      if(notAuthorize){
        this.notAuthorizeMessage = "Per accedere alla pagina desiderata effettua prima il login"
      }
      else{
        this.notAuthorizeMessage = "";
      }
    });

  }

  onSubmit(){
    if(this.loginForm.valid){
     // this.authService.login(this.loginForm.get("user").value, this.loginForm.get("password").value)
     /**Utilizziamo l'action e non più il service per avviare il login. Con l'action LoginStart la gestione del login
      * non la facciamo più nell' AuthService, bensì con gli effects del file auth.effects.ts
      * NOTA BENE: dispatch non restituisce un Observable, quindi non possiamo effettuare la Subscribe in questa parte di codice
     */
      this.store.dispatch(new AuthActions.LoginStart({email:this.loginForm.get("user").value, password:this.loginForm.get("password").value}));


    }
  }

  onLogout(){
    //this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }


}
