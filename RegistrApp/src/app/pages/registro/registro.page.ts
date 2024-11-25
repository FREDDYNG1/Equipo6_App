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

    this.isLoading = true;

    const registroData = {
      name: this.nombre,
      email: this.email,
      password: this.password,
      username: this.username,
      groupId: this.groupId
    };


    console.log('Enviando los siguientes datos:', registroData);


    this.apiService.registerUser(registroData).subscribe(
      async (response) => {
        this.isLoading = false;
        console.log('Registro exitoso:', response);
        const alert = await this.alertCtrl.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente',
          buttons: ['OK']
        });
        await alert.present();

        this.router.navigate(['/login']);
      },
      async (error) => {
        this.isLoading = false;
        console.error('Error en el registro:', error);

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
