import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://registr-api.fly.dev/user'; // Base URL de la API
  private currentUser = new BehaviorSubject<any>(null); // Usuario actual

  constructor(private http: HttpClient) {}

  // Método para el registro de usuarios
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Método para el inicio de sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Método para establecer el usuario actual
  setCurrentUser(user: any): void {
    this.currentUser.next(user); // Actualizar el usuario actual
  }

  // Método para obtener el usuario actual como observable
  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  // Método para obtener el usuario actual directamente
  getCurrentUserValue(): any {
    return this.currentUser.value;
  }

  // Método para cerrar sesión
  logout() {
    this.currentUser.next(null); // Limpia el usuario actual utilizando el método `next`
    localStorage.clear(); // Limpia el almacenamiento local si lo estás utilizando
    sessionStorage.clear(); // Limpia el almacenamiento de sesión si es necesario
  }

  // Método para limpiar el usuario actual
  clearCurrentUser(): void {
    this.currentUser.next(null); // Limpia el estado del usuario
    sessionStorage.clear(); // Opcional: limpia la sesión si la estás usando
  }

}
