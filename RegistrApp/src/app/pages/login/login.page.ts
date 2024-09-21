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
    // Verifica si los campos de usuario o contraseña están vacíos
    if (!this.usuario || !this.contrasena) {
      this.mensaje = 'Por favor, ingrese usuario y contraseña';
      return; 
    }
  
    this.isLoading = true; // Muestra el spinner al iniciar sesión
    this.mensaje = ''; // Limpia cualquier mensaje previo
  
    // Simulación de la autenticación (reemplazar con tu lógica real)
    setTimeout(async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(this.usuario) && this.contrasena === '1234') {
        this.mensaje = 'Inicio de sesión correcto';
        
        // Navega a la página de inicio si las credenciales son correctas
        this.router.navigate(['/home-docente']).then(async () => {
          // Muestra una alerta de bienvenida usando AlertController
          const alert = await this.alertController.create({
            backdropDismiss: false, 
            header: 'Bienvenido',
            message: 'Inicio de sesión exitoso',
            buttons: ['OK']
          });
          await alert.present();
        });
      } else {
        // Muestra un mensaje de error si las credenciales no son correctas
        const alert = await this.alertController.create({
          backdropDismiss: false, 
          header: 'Error',
          message: 'Usuario o contraseña incorrectos',
          buttons: ['OK']
        });
        await alert.present();
      }
      this.isLoading = false; // Oculta el spinner después de la autenticación
    }, 1000); // Tiempo de espera simulado
  }
}
