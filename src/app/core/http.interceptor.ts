import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store,
  ) {};


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
        withCredentials: true
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.auth.logout();
            return throwError(() => new Error('Session not valid.'));
          } else {
            this.router.navigate([`error/${error.status}`]);
            return throwError(() => new Error('An error has occured; please try again later.'));
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
