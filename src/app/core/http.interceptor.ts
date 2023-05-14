import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private store: Store,
  ) {};


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq)
  }
}
