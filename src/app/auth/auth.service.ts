import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.API_URL;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.router.navigate([`/cookbook/${response.user.id}`]);
      })
    );
  }

  signUp(user: any) {
    return this.http.post(`${this.baseUrl}/create`, {user: user}).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.router.navigate([`/cookbook/${response.user.id}`]);
      })
    );;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/landing']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }
}
