import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {
  menuOptions = [
    {
      titulo: 'Inicio',
      url: '/inicio',
      icon: 'home',
    },
    {
      titulo: 'Perfil',
      url: '/perfil-estudiante',
      icon: 'person-outline',
    },
    {
      titulo: 'Cerrar Sesión',
      url: '/logout',
      icon: 'log-out-outline',
    },
  ];

  saludo: string = '¡Bienvenido!';
  currentDate: string = ''; // Variable para la fecha actual
  attendedClassesCount: number = 0; // Nueva propiedad para las clases asistidas

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

        // Una vez que tenemos el nombre del usuario, intentamos obtener la cantidad de clases asistidas
        try {
          this.attendedClassesCount = await this.supabaseService.obtenerClasesAsistidas();
        } catch (e) {
          console.error('Error al obtener clases asistidas:', e);
          // Aquí puedes decidir si mostrar un mensaje, ignorar el error o manejarlo de otra forma
          // Por ejemplo, simplemente no mostrar el conteo o mostrar 0
          this.attendedClassesCount = 0;
        }
      } else {
        this.saludo = '¡Bienvenido!';
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      this.router.navigate(['/login']); // Redirigir al login en caso de error
    }
  }
}
