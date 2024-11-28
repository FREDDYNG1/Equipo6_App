import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular'; // Importar ToastController
import { RecoveryModalComponent } from 'src/app/components/recovery-modal/recovery-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    groupId: 6,
    username: '', // Correo electrónico
    password: '', // Contraseña
  };

  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController, // Inyectar ModalController
    private toastController: ToastController // Inyectar ToastController
  ) {}

  // Función para mostrar mensajes en pantalla
  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Duración en milisegundos
      color, // Color del mensaje (rojo para errores)
      position: 'top', // Posición del mensaje
    });
    toast.present();
  }

  login() {
    // Validar que los campos estén completos
    if (!this.credentials.username || !this.credentials.password) {
      this.showToast('Por favor, complete todos los campos');
      return;
    }

    // Validar que el correo sea válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.credentials.username)) {
      this.showToast('Por favor, ingrese un correo válido');
      return;
    }

    this.isLoading = true; // Mostrar indicador de carga

    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso:', response);

        // Extraer el nombre del usuario del correo electrónico
        const emailParts = this.credentials.username.split('@');
        const userName = emailParts[0]; // Nombre de usuario (antes del @)

        // Crear objeto de usuario con el nombre y otros datos
        const user = {
          name: userName,
          email: this.credentials.username,
        };

        // Guardar el usuario en AuthService
        this.authService.setCurrentUser(user);

        // Redirigir según el dominio del correo
        const emailDomain = emailParts[1]; // Dominio del correo
        if (emailDomain === 'alumno.com') {
          this.router.navigate(['/home-alumno']);
        } else if (emailDomain === 'docente.com') {
          this.router.navigate(['/home-docente']);
        } else {
          this.showToast('Dominio no permitido. Verifique su correo electrónico.');
          this.isLoading = false; // Asegurarse de ocultar el spinner si el dominio no es válido
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.showToast('Credenciales incorrectas o error en el servidor');
        this.isLoading = false; // Ocultar indicador de carga en caso de error
      },
      () => {
        this.isLoading = false; // Ocultar el spinner cuando el observable termina (por seguridad)
      }
    );
  }

  // Abrir el modal de recuperación de contraseña
  async openRecoveryModal() {
    const modal = await this.modalController.create({
      component: RecoveryModalComponent, // Componente del modal
    });
    await modal.present();
  }
}
