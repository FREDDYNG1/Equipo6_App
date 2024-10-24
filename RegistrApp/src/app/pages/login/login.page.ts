import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

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
    private apiService: ApiService
  ) {}

  // Método de inicio de sesión
  async iniciarSesion() {
    if (!this.email || !this.password) {
      this.mensaje = 'Por favor, ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true; // Mostrar spinner
    this.mensaje = ''; // Limpiar mensajes anteriores

    const credentials = {
      email: this.email,
      password: this.password,
      groupId: this.groupId
    };

    this.apiService.loginUser(credentials).subscribe(
      async (response: any) => {
        console.log('Respuesta recibida de la API:', response); // Depuración
        if (response.isValid) {
          console.log('Credenciales válidas'); // Depuración

          const dominio = this.email.split('@')[1];
          let ruta = '';

          if (dominio === 'docente.com') {
            ruta = '/home-docente';
          } else if (dominio === 'alumno.com') {
            ruta = '/home-alumno';
          } else {
            ruta = '/home-general'; // Ruta general para otros dominios
          }

          console.log('Dominio:', dominio); // Depuración del dominio
          console.log('Ruta a la que se redirige:', ruta); // Depuración de la ruta

          // Navegar a la página correspondiente
          this.router.navigate([ruta]).then(async () => {
            console.log('Navegación exitosa a:', ruta); // Verifica que la navegación se completó
            const alert = await this.alertController.create({
              backdropDismiss: false,
              message: `¡Bienvenido, ${this.email} !`,
              buttons: ['OK']
            });
            await alert.present();
          }).catch((err) => {
            console.error('Error en la navegación:', err); // Captura errores en la navegación
          });

        } else {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Autenticación fallida, intente nuevamente',
            buttons: ['OK']
          });
          await alert.present();
        }

        this.isLoading = false; // Ocultar el spinner después de la autenticación
      },
      async (error) => {
        console.log('Error en la autenticación:', error); // Depuración
        if (error.status === 404) {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Usuario no registrado',
            message: 'No se encontró una cuenta con este correo. Por favor, regístrese.',
            buttons: ['OK']
          });
          await alert.present();
        } else if (error.status === 401) {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Usuario o contraseña incorrectos',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Ha ocurrido un error inesperado. Por favor, intente nuevamente más tarde.',
            buttons: ['OK']
          });
          await alert.present();
        }

        this.isLoading = false;
      }
    );
  }
}
