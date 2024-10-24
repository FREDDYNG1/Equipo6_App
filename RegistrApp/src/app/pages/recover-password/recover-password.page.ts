import { Component } from '@angular/core';
import { PasswordService } from '../../services/password.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage {
  email: string = '';

  constructor(
    private passwordService: PasswordService,
    private alertController: AlertController
  ) {}

  async recoverPassword() {
    const password = await this.passwordService.getPassword(this.email);

    if (password) {
      const alert = await this.alertController.create({
        header: 'Contraseña Recuperada',
        message: `Tu contraseña es: ${password}`,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se encontró la cuenta con ese correo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
