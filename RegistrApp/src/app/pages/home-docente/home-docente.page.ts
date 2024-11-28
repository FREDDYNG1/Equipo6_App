import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar el servicio Router
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {
  menuOptions = [
    { titulo: 'Inicio', url: '/inicio', icon: 'home' },
    { titulo: 'Perfil', url: '/perfil', icon: 'person-outline' },
    { titulo: 'Cerrar Sesión', url: '/logout', icon: 'log-out-outline' },
  ];

  saludo: string = '¡Bienvenido!';
  currentDate: string = ''; // Variable para la fecha actual

  constructor(private authService: AuthService, private router: Router) {}

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
  loadUser() {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        if (user && user.name) {
          this.saludo = `¡Bienvenido, ${user.name}!`;
        } else {
          this.saludo = '¡Bienvenido!';
          // Redirigir al login si no hay usuario autenticado
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
        this.router.navigate(['/login']); // Redirigir al login en caso de error
      }
    );
  }
}
