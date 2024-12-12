import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { RecoveryModalComponent } from 'src/app/components/recovery-modal/recovery-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  credentials = {
    username: '',
    password: '',
  };
  isLoading: boolean = false;
  welcomeMessage: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top',
    });
    toast.present();
  }

  async login() {
    // Validaciones usando this.credentials.username y this.credentials.password
    if (!this.credentials.username || !this.credentials.password) {
      this.showToast('Por favor, complete todos los campos.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.credentials.username)) {
      this.showToast('Por favor, ingrese un correo válido.');
      return;
    }

    this.isLoading = true;

    try {
      const { data, error } = await this.supabaseService.signIn(
        this.credentials.username,
        this.credentials.password
      );

      if (error) {
        throw new Error('Credenciales incorrectas o error en el servidor.');
      }

      console.log('Inicio de sesión exitoso:', data);

      const { data: userData, error: userError } = await this.supabaseService.getByUserEmail(
        this.credentials.username
      );

      if (userError || !userData || userData.length === 0) {
        throw new Error('No se pudo obtener la información del usuario.');
      }

      const userName = userData[0].name;
      this.welcomeMessage = `¡Bienvenido, ${userName}!`;
      console.log(this.welcomeMessage);

      const emailParts = this.credentials.username.split('@');
      const emailDomain = emailParts[1];

      if (emailDomain === 'alumno.com') {
        this.router.navigate(['/home-alumno']);
      } else if (emailDomain === 'docente.com') {
        this.router.navigate(['/home-docente']);
      } else {
        this.showToast('Dominio no permitido. Verifique su correo electrónico.');
      }
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error.message);
      this.showToast(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async openRecoveryModal() {
    const modal = await this.modalController.create({
      component: RecoveryModalComponent,
    });
    await modal.present();
  }
}
