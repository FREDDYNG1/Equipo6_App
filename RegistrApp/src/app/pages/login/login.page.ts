import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa el AlertController
import { ApiService } from 'src/app/services/api.service';  // Asegúrate de que el servicio esté importado

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  nombre: string = '';
  email: string = '';
  password: string = '';
  username: string = '';  // Campo añadido
  groupId: number = 6;  // ID del grupo
  mensaje: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private alertController: AlertController, private apiService: ApiService) {}

  // Método de inicio de sesión
  async iniciarSesion() {
    if (!this.email || !this.password) {
      this.mensaje = 'Por favor, ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true; // Mostrar spinner
    this.mensaje = ''; // Limpiar mensajes anteriores

    // Crear el objeto con las credenciales
    const credentials = {
      email: this.email,
      password: this.password,
      groupId: this.groupId
    };

    // Llamar al método loginUser del servicio ApiService
    this.apiService.loginUser(credentials).subscribe(
      async (response: any) => {
        console.log('Respuesta recibida de la API:', response); // Depuración
        if (response.isValid) {
          console.log('Credenciales válidas'); // Depuración

          // Extraer el dominio del correo electrónico
          const dominio = this.email.split('@')[1];
          let ruta = '';

          // Lógica de redirección en función del dominio del correo
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
            // Mostrar una alerta de bienvenida
            const alert = await this.alertController.create({
              backdropDismiss: false,
              header: 'Bienvenido',
              message: 'Inicio de sesión exitoso',
              buttons: ['OK']
            });
            await alert.present();
          }).catch((err) => {
            console.error('Error en la navegación:', err); // Captura errores en la navegación
          });

        } else {
          // Si isValid es falso, mostrar error
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
        // Verificar el tipo de error recibido
        if (error.status === 404) {
          // Asumiendo que el código de estado 404 indica que el usuario no está registrado
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Usuario no registrado',
            message: 'No se encontró una cuenta con este correo. Por favor, regístrese.',
            buttons: ['OK']
          });
          await alert.present();
        } else if (error.status === 401) {
          // Credenciales incorrectas
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Usuario o contraseña incorrectos',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          // Otros errores, como problemas del servidor o red
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Error',
            message: 'Ha ocurrido un error inesperado. Por favor, intente nuevamente más tarde.',
            buttons: ['OK']
          });
          await alert.present();
        }

        this.isLoading = false; // Ocultar el spinner después del error
      }
    );
  }
}
