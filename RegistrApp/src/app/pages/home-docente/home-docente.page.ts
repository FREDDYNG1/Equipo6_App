import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {
  menuOptions = [
    { titulo: 'Inicio', url: '/inicio', icon: 'home' },
    { titulo: 'Perfil', url: '/perfil-docente', icon: 'person-outline' },
    { titulo: 'Cerrar Sesión', url: '/logout', icon: 'log-out-outline' },
  ];

  saludo: string = '¡Bienvenido!';
  currentDate: string = ''; // Variable para la fecha actual

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  ngOnInit() {
    this.setCurrentDate(); // Establecer la fecha actual
    this.loadUser(); // Cargar datos del usuario actual
  }

  // Función para obtener la fecha actual
  setCurrentDate() {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Día de la semana
      year: 'numeric', // Año
      month: 'long', // Mes
      day: 'numeric', // Día del mes
    };
    this.currentDate = today.toLocaleDateString('es-ES', options); // Formato de fecha en español
  }

  // Función para cargar datos del usuario actual
  async loadUser() {
    try {
      const user = await this.supabaseService.getUserNameAndLastName();
      if (!user) {
        throw new Error('Usuario no autenticado o error al obtener los datos del usuario.');
      }

      if (user.name) {
        this.saludo = `¡Bienvenido, ${user.name}!`;
      } else {
        this.saludo = '¡Bienvenido!';
        this.router.navigate(['/login']); // Redirigir al login si no hay nombre disponible
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      this.router.navigate(['/login']); // Redirigir al login en caso de error
    }
  }
}
