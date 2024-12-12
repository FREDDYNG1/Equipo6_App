import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
})
export class PerfilEstudiantePage implements OnInit {

  user = {
    name: 'Juan Pérez',
    institution: 'Universidad de Chile',
    career: 'Ingeniería en Informática',
    profilePicture: 'assets/images/profile-placeholder.webp', // Ruta a la imagen de perfil
  };

  // Nueva propiedad para almacenar la cantidad de clases asistidas
  attendedClassesCount: number = 0;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    // Si no vas a implementar nada en ngOnInit por ahora, puedes quitar esta línea:
    // throw new Error('Method not implemented.');
  }

  editProfile() {
    console.log('Editar perfil');
  }

  logout() {
    console.log('Cerrar sesión');
  }

  async ionViewWillEnter() {
    try {
      // Llamamos a obtenerClasesAsistidas del servicio y guardamos el resultado
      this.attendedClassesCount = await this.supabaseService.obtenerClasesAsistidas();
    } catch (error: any) {
      console.error('Error al obtener clases asistidas:', error.message);
    }
  }
}
