import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login/login-request';

const API = 'https://assignment1.swafe.dk/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<string> {
    const body: LoginRequest = { username, password };

    return this.http.post(`${API}/Login`, body, { responseType: 'text' }).pipe(
      tap(token => localStorage.setItem('jwt', token))
    );
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }
}