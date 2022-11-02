/* eslint-disable @typescript-eslint/dot-notation */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppdataService } from './appdata.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private appData: AppdataService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Requesting URL : ', request.url);
    //console.log('Params ', JSON.stringify(request.body));
    console.log('Tokken ', this.appData.userData['token']);
    if (
      this.appData.userData['token'] &&
      this.appData.userData['token'] !== ''
    ) {
      //console.log("checking token")
      const authReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.appData.userData['token']
        ),
      });

      console.log('headers', authReq);
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
