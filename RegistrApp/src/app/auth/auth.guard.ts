import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // Verifica si el usuario puede activar la ruta
  canActivate(): Observable<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true;  // Permite el acceso si el usuario está autenticado
        } else {
          this.router.navigate(['/login']);  // Redirige al login si no está autenticado
          return false;
        }
      })
    );
  }
}
