import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  name = '';
  lastName = '';
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private toastController: ToastController
  ) {}

  // Mostrar mensajes al usuario
  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top',
    });
    toast.present();
  }

  // Validar campos del formulario
  validateInputs(): boolean {
    if (!this.name.trim() || !this.lastName.trim() || !this.email.trim() || !this.password.trim()) {
      this.showToast('Por favor, complete todos los campos.');
      return false;
    }

    // Validar formato del correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.showToast('Por favor, ingrese un correo válido.');
      return false;
    }

    return true;
  }

  async register() {
    if (!this.validateInputs()) {
      return;
    }

    this.isLoading = true;

    try {
      // Registrar usuario en Supabase Auth
      const { error: authError } = await this.supabaseService.signUp(this.email, this.password);
      if (authError) {
        throw new Error(authError.message);
      }

      // Registrar información adicional en la tabla "users"
      const user = {
        name: this.name.trim(),
        last_name: this.lastName.trim(),
        email: this.email.trim(),
        password: '********', // Valor genérico para cumplir con la restricción NOT NULL
      };
      const { error: dbError } = await this.supabaseService.addUser(user);

      if (dbError) {
        throw new Error(dbError.message);
      }

      this.showToast('¡Registro exitoso!', 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error en el registro:', error.message);
      this.showToast('Error en el registro: ' + error.message);
    } finally {
      this.isLoading = false;
    }
  }
}
