import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service'; // Importar SupabaseService

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent {
  constructor(private supabaseService: SupabaseService, private router: Router) {}

  /**
   * Método para cerrar sesión
   */
  async signOut() {
    try {
      // Cerrar sesión en Supabase
      await this.supabaseService.signOut();

      console.log('Sesión cerrada exitosamente.');

      // Redirigir al login
      await this.router.navigate(['/login']);
      console.log('Redirigido a /login');
    } catch (error) {
      console.error('Error al cerrar sesión:', (error as any).message);
    }
  }
}
