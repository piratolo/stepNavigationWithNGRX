import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private router:Router, private authService:AuthService, private store:Store<fromApp.AppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    /*Si salve in un campo di AuthService l'url corrente che l'utente sta visualizzando o tentando di visualizzare e per il qualeù
    verifichiamo i permessi con canActivate. Così, se l'utente non può vedere l'url perchè non autorizzato e poi effettua il login, a login
    avvenuto lo reindirizziamo verso la pagina che voleva vedere */
    this.authService.setRedirectUrl(state.url);
    return this.store.select('auth').pipe(
      take(1),
      map(authState =>{
        return authState.user
      }),
      map(user=>{
        if(user && user.token){
          return true;
        }
        return this.router.createUrlTree(["/login"]);
      })
    );
  }
}
