import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async restablecerContrasena() {
    const alert = await this.alertController.create({
      header: 'Restablecer Contraseña',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingrese su correo electrónico'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            if (data.email) {
              // Aquí puedes agregar la lógica para enviar el correo de restablecimiento
              const successAlert = await this.alertController.create({
                header: 'Correo Enviado',
                message: 'Se ha enviado un correo para restablecer su contraseña.',
                buttons: ['OK']
              });
              await successAlert.present();
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'Por favor, ingrese un correo electrónico válido.',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
