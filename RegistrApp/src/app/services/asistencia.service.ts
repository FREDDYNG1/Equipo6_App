import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia por la URL de tu backend

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de clases y su asistencia
   */
  obtenerClases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clases`);
  }

  /**
   * Registra la asistencia de un alumno
   */
  registrarAsistencia(claseId: string, correo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/asistencia`, {
      claseId,
      correo,
    });
  }
}
