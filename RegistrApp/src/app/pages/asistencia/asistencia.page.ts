import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  claseId: number | null = null;
  studentName: string = ''; // Nombre del alumno
  successMessage: string | null = null; // Mensaje de éxito
  errorMessage: string | null = null; // Mensaje de error

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit() {
    // Obtener el ID de la clase desde la URL
    this.claseId = Number(this.route.snapshot.paramMap.get('id'));
  }

  async registerAttendance() {
    if (!this.studentName.trim()) {
      this.errorMessage = 'Por favor ingresa tu nombre';
      return;
    }

    if (!this.claseId) {
      this.errorMessage = 'No se pudo identificar la clase';
      return;
    }

    try {
      // Llamar al servicio para registrar la asistencia
      const asistencia = {
        clase_id: this.claseId,
        nombre_alumno: this.studentName,
        fecha_asistencia: new Date(),
      };

      await this.supabaseService.registrarAsistencia(asistencia);

      this.successMessage = 'Asistencia registrada correctamente';
      this.errorMessage = null;
      this.studentName = ''; // Limpiar el campo de nombre
    } catch (error) {
      this.successMessage = null;
      this.errorMessage = 'Error al registrar asistencia';
      console.error('Error al registrar asistencia:', error);
    }
  }
}
