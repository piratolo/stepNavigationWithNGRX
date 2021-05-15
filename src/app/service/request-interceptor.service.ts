import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take, timeout, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

/*Interceptor per tutte le chiamate */

/*Questa costante è utilizzata in app.module.ts per passare a questo interceptor un valore */
export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{

  /*Questo campo del costruttore ottiene in ingresso il valore definito in app.moduel.ts */
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number, private authService:AuthService, private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      (
      take(1)),
      map(authState => {
        return authState.user
      }),
      exhaustMap(user => {
        if(!user){
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
        return next.handle(modifiedReq).pipe(timeout(this.defaultTimeout));
        })
      )

  }

}
