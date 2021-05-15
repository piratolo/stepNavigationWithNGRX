import { Router } from '@angular/router';
import { NgbdModalConfirm } from './../../bootstrap/modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of, throwError } from 'rxjs';
import { switchMap, catchError, map, tap } from "rxjs/operators";
import * as AuthActions from './auth.actions'
import { Injectable, OnDestroy } from '@angular/core';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';

/*utilizzare il decoratore Injectable senza  il valore "inroot" .
Ricordardarsi di registrare gli effects dentro app.module.ts*/
@Injectable()
export class AuthEffects {

  private sessionAlertTimer:any;
  private sessionTimer:any;
  USER_LABEL:string = "storagedUser";

    /*Actions che utilizzamo qui non è come le actions
  che creiamo nei nostri file actions.ts. In questo caso Actions è un grande Observable che
  ci da accesso a tutte le actions (dei file actions.ts) che utilizziamo tramite la funzione
  dispatch, in modo che possiamo avere la possibilità di "reagire" quando queste actions vengono
  "dispatchate". In questo modo possiamo "reagire" alle action e gestire i side effetcs in questo file,
  creato appositamente, invece che nel reducer, che per convenzione non si dovrebbe occupare di gestire i
  side effects. In questo file NON viene gestito niente che ha ache fare con lo state.
  La convenzione prevede di mettere il segno $ come suffisso alla variabile di tipo Actions, visto che
  un variabile di tipo Osbservable. */
  constructor(
    private actions$:Actions,
    private httpClient:HttpClient,
    public modalService: NgbModal,
    private store:Store<fromApp.AppState>,
    private router: Router){
  }

  /*Non va chiamata la subscribe. Ngrx chiamerà la subscribe per noi. Utilizziamo la pipe e poi
  l'operatore oftype di NgRX, che ci permette di definire il tipo di effects che vogliamo catturare, all'interno
  dell'Osbservable Actions che, come spiegato sotto, contiene tutti gli actions/effects*/
  /*Applichiamo il decoratore @Effect, altrimenti non funzionerebbe */
  @Effect() authLogin = this.actions$.pipe(
    /*utilizzando la virgola è possibile definire più action all'interno
    di un singolo operatore oftype()*/
    //ofType(AuthActions.LOGIN_START, AuthActions.XXX)
    ofType(AuthActions.LOGIN_START),
    /*dopo l'operatore ofType utilizzamo l'operatore switchMap, che ci permette di creare un nuovo Observable utilizzando
    i dati di un altro Observable (actions$). L'Observable che restituiremo sarà l'Observable della chiamata HTTP. In questo esempio
    switchMap è inutile, nella realtà con switchMap possiamo estrarre i dati del primo observable, che ad esempio potrebbero essere
    username e password, ed utilizzarli per la chiamata http*/
    switchMap((authData: AuthActions.LoginStart) =>{
      let number:number = Math.floor(Math.random() * 11);
      let suffix:string = (number < 6)? "" : "zdf";
      return this.httpClient.get("https://jsonplaceholder.cypress.io" + suffix +"/todos/1")
      /*applichiamo la pipe all'Observable interno, in modo da poter gestire gli errori (con catcherror()) e il caso in cui la chiamata
      vada a buon fine (map())*/
      .pipe(
        map(result => {
          /* Visto che stiamo utilizzando il decoratore @Effect dobbiamo restituire una Action; in questo caso restituiamo
          una action di tipo login, visto che questa è la porzione di codice eseguita quando il login va a buon fine */
          return new AuthActions.Login(this.buildUser(result));
        }),
        /** anche catchError deve restituire un Observable, non è possibile restituire un Error, altrimenti l'effect va in errore */
        catchError(error =>{
          /*qui dobbiamo gestire gli errori e restituire un "non error" Observable, quindi utilizziamo l'operatore of per creare
          l'Observable in questione */
          return of(new AuthActions.LoginFail(this.handlerError(error)));
        })
      );
    }),
  );

  /** gestiamo il caso in cui il login abbia avuto successo. per gestire altri side effecct, ad esempio il reindirizzamento dell'utente
   * dopo il login.
   * In questo caso particolare vogliamo solo reindirizzare l'utente e non restituire una Action, cosa che dobbiamo fare obbligatoriamente
   * quando utilizziamo il decoratore @Effect; per questo motivo passiamo al decoratore l'oggetto {dispatch:false} */
  @Effect({dispatch:false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(()=>{
      this.router.navigate(["/console"]);
    })
  )

@Effect({dispatch:false})
authLogout = this.actions$.pipe(
  ofType(AuthActions.LOGOUT),
  tap(()=>{
    localStorage.removeItem(this.USER_LABEL);
    if(this.sessionTimer){
      clearTimeout(this.sessionTimer);
    }
    this.sessionTimer = null;

    if(this.sessionAlertTimer){
      clearTimeout(this.sessionAlertTimer);
    }
    this.sessionAlertTimer = null;
    this.router.navigate(["/login"]);
  })
);

/**Questo effect gestisce l'autologin */
@Effect()
authAutoLogin = this.actions$.pipe(
  ofType(AuthActions.AUTO_LOGIN),
  /**usiamo map per restituire una l'action che dice che il login è stato effettuato*/
  map(()=> {
      const user = JSON.parse(localStorage.getItem(this.USER_LABEL));
      if(user){
        const loadedUser = new User(user.email, user.idUser, user._token, new Date(user._tokenExpirationDate));
        if(loadedUser.token){
          return new AuthActions.Login({email: loadedUser.email, idUser: loadedUser.idUser, token: loadedUser.token, tokenExpirationDate: loadedUser.tokenExpirationDate});
        }
        /*Se il token non è valido restituiamo una action "fake", che non è gestita da alcun reducer. Siamo obbligati
        a restituire un'action fake in questo caso, non possiamo usare  la soluzione che prevede di passare al decoratore @Effect
        l'oggetto {dispatch:false} in modo da non essere obbligati a "restituire" un'action*/
        else{
          return {type: "DUMMY"};
        }
      }
      /*Se user è null restituiamo una action "fake", che non è gestita da alcun reducer. Siamo obbligati
        a restituire un'action fake in questo caso, non possiamo usare  la soluzione che prevede di passare al decoratore @Effect
        l'oggetto {dispatch:false} in modo da non essere obbligati a "restituire" un'action*/
        else{
          return {type: "DUMMY"};
      }
  })
);

buildUser(data): {
    email: string;
    idUser: number;
    token: string;
    tokenExpirationDate: Date;
}{
    let expirationDate:Date = new Date(new Date().getTime() + environment.sessionDuration);
    let user:User = new User("prova@prova.it", data.userId, this.makeid(40), expirationDate);
    this.sessionCountDown(environment.sessionDuration);
    localStorage.setItem(this.USER_LABEL, JSON.stringify(user));
    return {email: user.email, idUser: user.idUser, token: user.token, tokenExpirationDate: user.tokenExpirationDate};
  }

  makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }

  sessionCountDown(expirationDateInMillisecond){
    console.log("sessionCountDown");
    let modalRef = null;
    let countDownInterval = null;
    this.sessionAlertTimer = setTimeout(()=>{
      modalRef = this.modalService.open(NgbdModalConfirm);
      let c:number = +environment.sessionAlertTimer;
      modalRef.componentInstance.modalTitle = "La sessione sta per scadere: " + (c / 1000);
      modalRef.componentInstance.modalContent = "Vuoi prolungare la durata della sessione?";
      modalRef.componentInstance.okButtonLabel = "Si";
      modalRef.componentInstance.koButtonLabel = "No";
      countDownInterval = setInterval(()=>{
        c -= 1000;
        modalRef.componentInstance.modalTitle = "La sessione sta per scadere: " + (c / 1000);
      },1000);
      return modalRef.result.then(
        result =>{
         if(countDownInterval)clearInterval(countDownInterval);
          if(this.sessionTimer){
            clearTimeout(this.sessionTimer);
          }
          if(this.sessionAlertTimer){
            clearTimeout(this.sessionAlertTimer);
          }
          if(result == "ok"){
            this.buildUser({userId: 1});
          }
          else{
            this.store.dispatch(new AuthActions.Logout());
          }
        },
        ()=>{
          if(countDownInterval)clearInterval(countDownInterval);
          if(modalRef)modalRef.close();
        })
        .catch(error=>{
          if(countDownInterval)clearInterval(countDownInterval);
          if(modalRef)modalRef.close();
        });
    },expirationDateInMillisecond - environment.sessionAlertTimer);

    this.sessionTimer = setTimeout(()=>{
      if(modalRef)modalRef.close();
      this.store.dispatch(new AuthActions.Logout());
    },expirationDateInMillisecond);
  }

  /*Gestisce il tipo di errore restituito dal server. Ovviamente
  i campi del json gestiti stto devono essere cambiati in accordo
  all'oggetto che viene restituito nella response*/
  handlerError(errorRes:any){
    let errorMessage = 'An error occurred';
    if(!errorRes.error || !errorRes.error.message){
      return errorMessage;
    }
    switch(errorRes.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = "Email already Exist";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Email doesn't exist";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Wrong password";
        break;
    }
    return errorMessage;
  }




}
