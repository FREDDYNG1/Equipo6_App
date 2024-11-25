import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { RecoveryModalComponent } from 'src/app/components/recovery-modal/recovery-modal.component'; // Importar el modal

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  groupId: number = 6;
  mensaje: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private apiService: ApiService,
    private modalController: ModalController
  ) {}

  // Inicio de sesión
  async iniciarSesion() {
    if (!this.email || !this.password) {
      this.mensaje = 'Por favor, ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true;
    this.mensaje = '';

    const credentials = {
      email: this.email,
      password: this.password,
      groupId: this.groupId,
    };

    this.apiService.loginUser(credentials).subscribe(
      async (response: any) => {
        console.log('Respuesta recibida de la API:', response);
        if (response.isValid) {
          console.log('Credenciales válidas');

          const dominio = this.email.split('@')[1];
          let ruta = '';

          if (dominio === 'docente.com') {
            ruta = '/home-docente';
          } else if (dominio === 'alumno.com') {
            ruta = '/home-alumno';
          }

          console.log('Dominio:', dominio);
          console.log('Ruta a la que se redirige:', ruta);

          this.router
            .navigate([ruta])
            .then(async () => {
              console.log('Navegación exitosa a:', ruta);
              const alert = await this.alertController.create({
                backdropDismiss: false,
                message: `¡Bienvenido, ${this.email} !`,
                buttons: ['OK'],
              });
              await alert.present();
            })
            .catch((err) => {
              console.error('Error en la navegación:', err);
            });
        } else {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Autenticación fallida, intente nuevamente',
            buttons: ['OK'],
          });
          await alert.present();
        }

        this.isLoading = false;
      },
      async (error) => {
        console.log('Error en la autenticación:', error);
        if (error.status === 404) {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Usuario no registrado',
            message: 'No se encontró una cuenta con este correo. Por favor, regístrese.',
            buttons: ['OK'],
          });
          await alert.present();
        } else if (error.status === 401) {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Usuario o contraseña incorrectos',
            buttons: ['OK'],
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Ha ocurrido un error inesperado. Por favor, intente nuevamente más tarde.',
            buttons: ['OK'],
          });
          await alert.present();
        }

        this.isLoading = false;
      }
    );
  }

  // Método para abrir el modal de recuperación de contraseña
  async openRecoveryModal() {
    const modal = await this.modalController.create({
      component: RecoveryModalComponent,
    });
    return await modal.present();
  }
}
