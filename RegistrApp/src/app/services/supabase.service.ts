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

  // Auth methods
  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  async getUser() {
    return this.supabase.auth.getUser();
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  // User data methods
  async addUser(user: { name: string; last_name: string; email: string }) {
    return this.supabase.from('users').insert([user]);
  }

  async getUserNameAndLastName() {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error || !user) {
      throw new Error('Error al obtener el usuario actual.');
    }

    const { data, error: userError } = await this.supabase
      .from('users')
      .select('name, last_name')
      .eq('email', user.email)
      .single();

    if (userError) {
      throw new Error('Error al obtener el nombre y apellido del usuario.');
    }

    return data;
  }

  async getUserData(): Promise<any> {
    const { data: { user }, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error al obtener el usuario:', error.message);
      return null;
    }
    return user;
  }

  getByUserEmail(email: string) {
    return this.supabase.from('users').select('*').eq('email', email);
  }

  // Class methods
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
      .select('*')
      .order('fecha', { ascending: true }); // Ordenar por fecha
    if (error) {
      console.error('Error al obtener clases:', error.message);
      throw error;
    }
    return data;
  }

  // Attendance methods
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

  async obtenerClasesAsistidas(): Promise<number> {
    const { data: { user }, error: userError } = await this.supabase.auth.getUser();
    if (userError || !user) {
      console.error('Error al obtener el usuario actual:', userError?.message);
      throw new Error('No se pudo obtener el usuario actual.');
    }

    const { count, error } = await this.supabase
      .from('clases')
      .select('id', { count: 'exact', head: true })
      // Filtrar por el user_id en lugar de email
      .eq('user_id', user.id);

    if (error) {
      console.error('Error al obtener el conteo de clases asistidas:', error.message);
      throw error;
    }

    // Retorna el conteo exacto de registros
    return count || 0;
  }


}
