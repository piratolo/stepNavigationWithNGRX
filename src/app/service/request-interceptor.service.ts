import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

/*Interceptor per tutte le chiamate */

/*Questa costante è utilizzata in app.module.ts per passare a questo interceptor un valore */
export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{

  /*Questo campo del costruttore ottiene in ingresso il valore definito in app.moduel.ts */
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor chiamato. Timeout:" + this.defaultTimeout);
    return next.handle(req).pipe(timeout(this.defaultTimeout));
  }
}
