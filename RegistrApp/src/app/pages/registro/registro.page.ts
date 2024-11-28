import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  user = {
    name: '',
    groupId: 6,
    password: '',
    username: '',
    email: '',
  };
  isLoading: boolean = false; // Indicador de carga

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router // Inyectar Router
  ) {}

  // Función para mostrar mensajes en pantalla
  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duración del mensaje
      color, // Color del mensaje
      position: 'top', // Posición en pantalla
    });
    toast.present();
  }

  // Validar datos antes de enviar
  validateInputs(): boolean {
    // Eliminar espacios en blanco de los campos
    this.user.name = this.user.name.trim();
    this.user.email = this.user.email.trim();
    this.user.password = this.user.password.trim();

    // Validar que no haya campos vacíos
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.showToast('Por favor, complete todos los campos.');
      return false;
    }

    // Validar formato del correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.user.email)) {
      this.showToast('Por favor, ingrese un correo válido.');
      return false;
    }

    // Validar que no haya espacios en la contraseña
    if (this.user.password.includes(' ')) {
      this.showToast('La contraseña no debe contener espacios.');
      return false;
    }

    return true; // Los datos son válidos
  }

  register() {
    // Validar los campos antes de proceder
    if (!this.validateInputs()) {
      return;
    }

    this.isLoading = true; // Mostrar indicador de carga
    console.log('Datos enviados al servicio:', this.user);

    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.showToast('Usuario registrado exitosamente', 'success'); // Mensaje de éxito

        // Redirigir a la página de login
        this.router.navigate(['/login']);

        this.isLoading = false; // Ocultar indicador de carga
      },
      (error) => {
        console.error('Error en el registro:', error);

        // Verificar si el error es por correo ya registrado
        if (error.status === 409) {
          this.showToast('El correo ya está registrado. Intente con otro.', 'danger');
        } else {
          this.showToast('Error al registrar usuario. Intente nuevamente.', 'danger');
        }

        this.isLoading = false; // Ocultar indicador de carga
      }
    );
  }
}
