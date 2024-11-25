import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://registr-api.fly.dev/user/';

  constructor(private http: HttpClient) {}


  registerUser(userData: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}create`, JSON.stringify(userData), { headers });
  }


  loginUser(credentials: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiUrl}login`, JSON.stringify(credentials), { headers });
  }
}
