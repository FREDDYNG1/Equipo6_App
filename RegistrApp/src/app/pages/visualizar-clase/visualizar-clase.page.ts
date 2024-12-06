import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-visualizar-clase',
  templateUrl: './visualizar-clase.page.html',
  styleUrls: ['./visualizar-clase.page.scss'],
})
export class VisualizarClasePage implements OnInit {
  clases: any[] = []; // Lista de clases
  cargando: boolean = true; // Indicador de carga

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    await this.obtenerClases(); // Cargar clases al iniciar la página
  }

  async obtenerClases() {
    try {
      this.cargando = true;
      this.clases = await this.supabaseService.obtenerClases();
      console.log('Clases obtenidas:', this.clases);
    } catch (error) {
      console.error('Error al obtener las clases:', (error as any).message);
      alert('Hubo un error al obtener las clases.');
    } finally {
      this.cargando = false;
    }
  }
}
