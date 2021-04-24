import { User } from './../model/user.model';
import { environment } from './../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  USER_LABEL:string = "storagedUser";

  user = new BehaviorSubject<User>(null);

  private sessionTimer:any;

  constructor(private httpClient:HttpClient) { }

  login(user:string, password:string){
    let number:number = Math.floor(Math.random() * 11);
    let suffix:string = (number < 6)? "" : "zdf";
    return this.httpClient.get("https://jsonplaceholder.cypress.io" + suffix +"/todos/1")
    .pipe(
      tap(result =>{
        this.buildUser(result)
      })
    );
  }

  buildUser(data){
    let expirationDate:Date = new Date(new Date().getTime() + environment.sessionDuration);
    let user:User = new User("prova@prova.it", data.userId, this.makeid(40), expirationDate);
    this.sessionCountDown(environment.sessionDuration);
    localStorage.setItem(this.USER_LABEL, JSON.stringify(user));
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
    this.sessionTimer = setTimeout(()=>{
      this.logout();
    },expirationDateInMillisecond);
  }

  logout(){
    localStorage.removeItem(this.USER_LABEL);
    if(this.sessionTimer){
      clearTimeout(this.sessionTimer);
    }
    this.sessionTimer = null;
    this.user.next(null);
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
    }
  }

  ngOnDestroy(): void {

  }

}
