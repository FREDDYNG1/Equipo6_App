import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-registrar-clase',
  templateUrl: './registrar-clase.page.html',
  styleUrls: ['./registrar-clase.page.scss'],
})
export class RegistrarClasePage {
  nombreAlumno: string = '';
  asignatura: string = '';
  fecha: string = ''; // Este campo será asignado automáticamente.

  constructor(private supabaseService: SupabaseService) {}

  // Método para obtener la fecha actual en formato YYYY-MM-DD
  obtenerFechaActual(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0, por eso +1
    const dia = String(hoy.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  async registrarClase() {
    try {
      if (!this.nombreAlumno || !this.asignatura) {
        console.error('Por favor completa todos los campos.');
        return;
      }

      // Asignar la fecha automáticamente
      this.fecha = this.obtenerFechaActual();

      const clase = {
        nombre_alumno: this.nombreAlumno,
        asignatura: this.asignatura,
        fecha: this.fecha,
      };

      const resultado = await this.supabaseService.registrarClase(clase);
      console.log('Clase registrada exitosamente:', resultado);

      // Limpiar el formulario después de registrar
      this.nombreAlumno = '';
      this.asignatura = '';
      this.fecha = '';
    } catch (error) {
      console.error('Error al registrar la clase:', (error as any).message);
    }
  }
}
