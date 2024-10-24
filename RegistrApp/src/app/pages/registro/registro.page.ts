import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  email: string = '';
  password: string = '';
  username: string = '';  // Campo añadido
  groupId: number = 6;  // ID del grupo
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async registrarUsuario() {
    // Verificación de campos vacíos
    if (!this.nombre || !this.email || !this.password || !this.username) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.isLoading = true;  // Mostrar spinner de carga

    const registroData = {
      name: this.nombre,
      email: this.email,
      password: this.password,
      username: this.username,  // Asegurarse de que se envía el campo username
      groupId: this.groupId
    };

    // Depurar el envío de datos
    console.log('Enviando los siguientes datos:', registroData);

    // Llamada al servicio de registro
    this.apiService.registerUser(registroData).subscribe(
      async (response) => {
        this.isLoading = false;  // Ocultar spinner de carga
        console.log('Registro exitoso:', response);  // Depurar la respuesta del servidor

        const alert = await this.alertCtrl.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente',
          buttons: ['OK']
        });
        await alert.present();

        this.router.navigate(['/login']);  // Redirigir al inicio de sesión
      },
      async (error) => {
        this.isLoading = false;  // Ocultar spinner de carga en caso de error
        console.error('Error en el registro:', error);  // Depurar el error

        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: error.error?.message || 'Error al registrar el usuario',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }
}
