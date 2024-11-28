import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  clases: any[] = []; // Lista de clases
  showModal = false; // Controla la visibilidad del modal
  claseSeleccionada: any = null; // Clase actualmente seleccionada
  isLoading = false; // Indicador de carga

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit() {
    this.cargarClases();
  }

  /**
   * Carga la lista de clases desde el backend
   */
  cargarClases() {
    this.isLoading = true;
    this.asistenciaService.obtenerClases().subscribe(
      (data) => {
        this.clases = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las clases:', error);
        this.isLoading = false;
      }
    );
  }

  /**
   * Abre el modal con los detalles de la asistencia de la clase seleccionada
   */
  verAsistencia(clase: any) {
    this.claseSeleccionada = clase;
    this.showModal = true;
  }

  /**
   * Cierra el modal
   */
  cerrarModal() {
    this.showModal = false;
    this.claseSeleccionada = null;
  }
}
