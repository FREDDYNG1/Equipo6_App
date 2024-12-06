import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://oagwiungwzyhqkoecvxj.supabase.co'; // Reemplaza con tu URL
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZ3dpdW5nd3p5aHFrb2VjdnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0OTAwOTgsImV4cCI6MjA0OTA2NjA5OH0.5f-W_7AspVeS0qKS1sdvDt1uqJyK7LLUKKBKNyvCHNI'; // Reemplaza con tu clave
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  // Ejemplo: Insertar datos en una tabla
  async registrarClase(clase: any) {
    const { data, error } = await this.supabase.from('clases').insert([clase]);
    if (error) {
      console.error('Error al registrar clase:', error.message);
      throw error;
    }
    return data;
  }

  async obtenerClases() {
    const { data, error } = await this.supabase
      .from('clases')
      .select('*') // Traer todas las columnas
      .order('fecha', { ascending: true }); // Ordenar por fecha, opcional

    if (error) {
      console.error('Error al obtener clases:', error.message);
      throw error;
    }

    return data;
  }


}
