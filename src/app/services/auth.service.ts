import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Authentication, LoginResponse } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly apiUrl: string;
  readonly jwtKeyName = 'jwt';

  constructor(private http: HttpClient) {
    this.apiUrl = (window as any).env?.apiUrl || '/api';
  }

  getUserName(): string | null {
    const token = this.getToken();

    try {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));

        return payload.unique_name;
      }
      return null;
    } catch (error) {
      console.error('Error parsing token:', error);

      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));

        return payload.role;
      }
      return null;
    } catch (error) {
      console.error('Error parsing token:', error);
      
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.jwtKeyName);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.jwtKeyName);

    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      // JWT exp is in seconds since epoch
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < now) {
        // Token expired
        return false;
      }

      return true;

    } catch {
      // If the token is malformed or invalid, treat it as not authenticated
      return false;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    var authenticationModel: Authentication = {
      password: password,
      userName: username
    };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, authenticationModel).pipe(
      map(res => {
        localStorage.setItem(this.jwtKeyName, res.token);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem(this.jwtKeyName);
  }
}
