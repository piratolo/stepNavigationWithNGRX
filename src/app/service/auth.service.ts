import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirectUrl:string;
  notAuthorize =  new EventEmitter<boolean>();

  constructor(private router:Router, public modalService: NgbModal) { }

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
