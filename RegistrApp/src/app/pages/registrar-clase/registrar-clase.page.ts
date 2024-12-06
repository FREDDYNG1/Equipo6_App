import { Component } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-registrar-clase',
  templateUrl: './registrar-clase.page.html',
  styleUrls: ['./registrar-clase.page.scss'],
})
export class RegistrarClasePage {
  nombre: string = '';
  profesor: string = '';
  descripcion: string = '';
  fecha: string = '';

  constructor(private supabaseService: SupabaseService) {}

  async registrarClase() {
    try {
      // Validación de campos
      if (!this.nombre || !this.profesor || !this.descripcion || !this.fecha) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      // Datos de la clase
      const clase = {
        nombre: this.nombre,
        profesor: this.profesor,
        descripcion: this.descripcion,
        fecha: this.fecha, // Asegúrate de que el formato coincida con el tipo `date` en la tabla
      };

      // Llamada al servicio para registrar
      const resultado = await this.supabaseService.registrarClase(clase);
      console.log('Clase registrada:', resultado);

      // Limpiar formulario después de enviar
      this.nombre = '';
      this.profesor = '';
      this.descripcion = '';
      this.fecha = '';

      alert('Clase registrada exitosamente.');
    } catch (error) {
      console.error('Error al registrar la clase:', (error as any).message);
      alert('Hubo un error al registrar la clase.');
    }
  }
}
