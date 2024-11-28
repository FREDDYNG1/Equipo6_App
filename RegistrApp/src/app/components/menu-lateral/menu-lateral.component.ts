import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método para cerrar sesión
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      console.log('Sesión cerrada y redirigido a /login');
    }).catch((error) => {
      console.error('Error al redirigir:', error);
    });
  }

}
