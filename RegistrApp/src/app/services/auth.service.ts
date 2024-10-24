import { Injectable } from '@angular/core';
import { ApiService } from './api.service';  // Asegúrate de importar ApiService
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;  // Variable para manejar el estado de autenticación
  private token: string | null = null;  // Variable para almacenar el token si lo tuvieras

  constructor(private apiService: ApiService) {}

  // Método de login con lógica de autenticación real
  login(email: string, password: string): Observable<boolean> {
    const credentials = { email, password };

    return this.apiService.loginUser(credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.isAuthenticated = true;  // Autentica al usuario si hay token
          this.token = response.token;  // Almacena el token
        } else {
          this.isAuthenticated = false;  // No se autentica si no hay token
        }
      }),
      tap(() => this.isAuthenticated)  // Devuelve el estado de autenticación
    );
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return of(this.isAuthenticated);  // Devuelve el estado actual de autenticación
  }

  logout(): void {
    this.isAuthenticated = false;
    this.token = null;  // Limpia el token
  }

  getToken(): string | null {
    return this.token;
  }
}
