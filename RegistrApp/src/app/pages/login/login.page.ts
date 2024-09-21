import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa el AlertController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';
  mensaje: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {}

  async iniciarSesion() {
    if (!this.usuario || !this.contrasena) {
      this.mensaje = 'Por favor, ingrese usuario y contraseña';
      return;
    }

    this.isLoading = true; // Mostrar spinner
    this.mensaje = ''; // Limpiar mensajes anteriores

    // Simulación de autenticación, reemplaza con tu lógica real
    setTimeout(async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(this.usuario) && this.contrasena === '1234') {
        this.mensaje = 'Inicio de sesión correcto';

        // Extraer el dominio del correo electrónico
        const dominio = this.usuario.split('@')[1];

        let ruta = '';
        // Lógica de redirección en función del dominio del correo
        if (dominio === 'docente.com') {
          ruta = '/home-docente';
        } else if (dominio === 'alumno.com') {
          ruta = '/home-alumno';
        } else {
          ruta = '/home-general'; // Ruta general para otros dominios
        }

        // Navegar a la página correspondiente
        this.router.navigate([ruta]).then(async () => {
          // Mostrar una alerta de bienvenida
          const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Bienvenido',
            message: 'Inicio de sesión exitoso',
            buttons: ['OK']
          });
          await alert.present();
        });

      } else {
        // Mostrar mensaje de error si las credenciales no son correctas
        const alert = await this.alertController.create({
          backdropDismiss: false,
          header: 'Error',
          message: 'Usuario o contraseña incorrectos',
          buttons: ['OK']
        });
        await alert.present();
      }

      this.isLoading = false; // Ocultar spinner después de la autenticación
    }, 1000); // Simulación de tiempo de espera
  }
}

