import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role; // Assuming the role is stored in the token's payload
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');

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
    return this.http.post<{ token: string }>('/api/auth/login', { username, password }).pipe(
      map(res => {
        localStorage.setItem('jwt', res.token);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    // Optionally, you can also clear any user-related data here
  }
}
