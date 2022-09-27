import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService:AuthServiceService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('access-token') != null) {
      const token = this.authService.getToken();
      // if the token is  stored in localstorage add it to http header
      const headers = new HttpHeaders().set('access-token', token);
      //clone http to the custom AuthRequest and send it to the server
      const AuthRequest = request.clone({ headers: headers });
      return next.handle(AuthRequest);
    } else {
      return next.handle(request);
    }
  }
}
