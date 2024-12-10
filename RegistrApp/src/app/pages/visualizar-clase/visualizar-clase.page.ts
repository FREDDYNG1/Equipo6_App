import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';


@Component({
  selector: 'app-visualizar-clase',
  templateUrl: './visualizar-clase.page.html',
  styleUrls: ['./visualizar-clase.page.scss'],
})
export class VisualizarClasePage implements OnInit {
[x: string]: any;
  clases: any[] = []; // Lista de clases
  clasesAgrupadas: { [asignatura: string]: any[] } = {}; // Clases agrupadas por asignatura
  cargando: boolean = true; // Indicador de carga

  constructor(private supabaseService: SupabaseService) {}

async ngOnInit() {
  Object = Object; // Referencia al objeto global
  this.obtenerClases(); // Cargar clases al iniciar la página
}

  async obtenerClases() {
    try {
      this.cargando = true;
      this.clases = await this.supabaseService.obtenerClases();
      console.log('Clases obtenidas:', this.clases);
      this.agruparClases(); // Agrupar las clases por asignatura después de obtenerlas
    } catch (error) {
      console.error('Error al obtener las clases:', (error as any).message);
      alert('Hubo un error al obtener las clases.');
    } finally {
      this.cargando = false;
    }
  }

  agruparClases() {
    this.clasesAgrupadas = this.clases.reduce((grupos, clase) => {
      const { asignatura } = clase; // Suponiendo que `asignatura` está en cada clase
      if (!grupos[asignatura]) {
        grupos[asignatura] = [];
      }
      grupos[asignatura].push(clase);
      return grupos;
    }, {});
  }


}
