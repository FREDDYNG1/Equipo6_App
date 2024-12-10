import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://oagwiungwzyhqkoecvxj.supabase.co'; // Reemplaza con tu URL
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZ3dpdW5nd3p5aHFrb2VjdnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0OTAwOTgsImV4cCI6MjA0OTA2NjA5OH0.5f-W_7AspVeS0qKS1sdvDt1uqJyK7LLUKKBKNyvCHNI'; // Reemplaza con tu clave
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  /** Método para registrar una nueva clase */
  async registrarClase(clase: any) {
    const { data, error } = await this.supabase.from('clases').insert([clase]);
    if (error) {
      console.error('Error al registrar clase:', error.message);
      throw error;
    }
    return data;
  }

  /** Método para obtener todas las clases */
  async obtenerClases() {
    const { data, error } = await this.supabase
      .from('clases')
      .select('*')
      .order('fecha', { ascending: true }); // Ordenar por fecha
    if (error) {
      console.error('Error al obtener clases:', error.message);
      throw error;
    }
    return data;
  }

  /** Método para registrar asistencia */
  async registrarAsistencia(asistencia: any) {
    const { data, error } = await this.supabase
      .from('registros_asistencia')
      .insert([asistencia]);
    if (error) {
      console.error('Error al registrar asistencia:', error.message);
      throw error;
    }
    return data;
  }

  /** Método para obtener registros de asistencia de una clase */
  async addAttendance(claseId: string, nombreAlumno: string, fechaAsistencia: string) {
    const { data, error } = await this.supabase
      .from('registro_asistencia') // Cambiado para usar la tabla correcta
      .insert([
        {
          clase_id: claseId,
          nombre_alumno: nombreAlumno,
          fecha_asistencia: fechaAsistencia,
        },
      ]);

    if (error) {
      console.error('Error al agregar asistencia:', error);
      throw error;
    }

    return data;
  }


   // Obtener datos del usuario actual
   async getUserData(): Promise<any> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error al obtener el usuario:', error.message);
      return null;
    }
    return user;
  }
}
