import { NgbdModalConfirm } from './../bootstrap/modal-confirm/modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../model/user.model';
import { environment } from './../../environments/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements  OnDestroy{

  USER_LABEL:string = "storagedUser";
  user = new BehaviorSubject<User>(null);
  private currentUser:User = null;
  private sessionTimer:any;
  private sessionAlertTimer:any;
  private redirectUrl:string;
  notAuthorize =  new EventEmitter<boolean>();

  constructor(private httpClient:HttpClient, private router:Router, public modalService: NgbModal) { }

  login(user:string, password:string){
    let number:number = Math.floor(Math.random() * 11);
    let suffix:string = (number < 6)? "" : "zdf";
    return this.httpClient.get("https://jsonplaceholder.cypress.io" + suffix +"/todos/1")
    .pipe(
      catchError(this.handlerError),
      tap(result =>{
        this.buildUser(result);
        this.redirect();
      })
    );
  }

  /*Gestisce il tipo di errore restituito dal server. Ovviamente
  i campi del json gestiti stto devono essere cambiati in accordo
  all'oggetto che viene restituito nella response*/
  handlerError(errorRes:HttpErrorResponse){
    let errorMessage = 'An error occurred';
    if(!errorRes.error || !errorRes.error.message){
      return throwError({message: errorMessage});
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
    return throwError({message: errorMessage});
  }

  buildUser(data){
    console.log("dfgdfgf", data);
    let expirationDate:Date = new Date(new Date().getTime() + environment.sessionDuration);
    let user:User = new User("prova@prova.it", data.userId, this.makeid(40), expirationDate);
    this.sessionCountDown(environment.sessionDuration);
    localStorage.setItem(this.USER_LABEL, JSON.stringify(user));
    this.currentUser = user;
    this.user.next(user);
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
         if(this.currentUser){
          if(this.sessionTimer){
            clearTimeout(this.sessionTimer);
          }
          if(this.sessionAlertTimer){
            clearTimeout(this.sessionAlertTimer);
          }
          this.buildUser({userId: this.currentUser.idUser});
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
      this.logout();
    },expirationDateInMillisecond);
  }

  logout(){
    localStorage.removeItem(this.USER_LABEL);
    if(this.sessionTimer){
      clearTimeout(this.sessionTimer);
    }
    this.sessionTimer = null;

    if(this.sessionAlertTimer){
      clearTimeout(this.sessionAlertTimer);
    }
    this.sessionAlertTimer = null;


    this.user.next(null);
    this.currentUser = null;
    this.router.navigate(["/login"]);
  }

  autoLogin(){
    const user = JSON.parse(localStorage.getItem(this.USER_LABEL));
    if(!user){
      return;
    }
    const loadedUser = new User(user.email, user.idUser, user._token, new Date(user._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      this.sessionCountDown(loadedUser.tokenExpirationDate.getTime() - new Date().getTime());
      this.redirect();
    }
  }

  ngOnDestroy(): void {
  }

  /*Questo metodo è chiamato dalla classe RouteGuardService e dalle altri classi che passano a questo servizio l'url che l'utente voleva vedere prima di essere reindirizzato
  verso la pagina di login*/
  setRedirectUrl(url:string){
    this.redirectUrl = url;
    if(url != null && url.indexOf("/login") < 0 ){
      this.notAuthorize.emit(true);
    }
    else{
      this.notAuthorize.emit(false);
    }
  }

  /* dopo che l'utente si è loggato lo reindirizziamo direttamente verso la pagine che voleva vedere prima di essere reindirizzato
  verso la pagina di login (perchè non aveva l'autorizzazione a vedere quella pagina).*/
  redirect(){
    if (this.redirectUrl) {
      this.router.navigate([this.redirectUrl]);
      this.redirectUrl = null;
    }
  }

}
