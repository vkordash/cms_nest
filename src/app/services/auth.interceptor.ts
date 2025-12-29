import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      //const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)});
      //return next.handle(authReq);     
      
      const token = this.authService.getToken();
      //console.log(token);
      // Add the authentication token to the request headers   
      req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)});
      return next.handle(req);      
  }
}