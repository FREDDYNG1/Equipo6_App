import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://registr-api.fly.dev/user';
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  setCurrentUser(user: any): void {
    this.currentUser.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  getCurrentUserValue(): any {
    return this.currentUser.value;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.clearCurrentUser();
    sessionStorage.clear();
  }

  clearCurrentUser(): void {
    this.currentUser.next(null);
  }
}
