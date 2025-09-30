import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login/login-request';

const API = 'https://assignment1.swafe.dk/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  isAuthenticated = signal(false);

  defaultUsername = 'g10@bank.dk';
  defaultPassword = '1234';

  login(username: string, password: string): Observable<string> {
    const body: LoginRequest = { username, password };

    return this.http.post(`${API}/Login`, body, { responseType: 'text' }).pipe(
      tap(token => localStorage.setItem('jwt', token)),
      tap(() => this.isAuthenticated.set(true))
    );
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  autoLoginAndRun(
    onSuccess: () => void,
    onError?: (err: any) => void,
    username: string = this.defaultUsername,
    password: string = this.defaultPassword
  ) {
    if (!this.isAuthenticated){
      this.login(username, password).subscribe({
        next: () => onSuccess(),
        error: (err) => {
          console.error('Auto-login failed', err);
          if (onError){
            onError(err);
          }
        }
      })
    } else {
      onSuccess();  
    }
  }

  get token(): string | null {
    return localStorage.getItem('jwt');
  }
}