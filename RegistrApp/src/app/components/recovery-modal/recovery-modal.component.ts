import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recovery-modal',
  templateUrl: './recovery-modal.component.html',
  styleUrls: ['./recovery-modal.component.scss'],
})
export class RecoveryModalComponent {
  email: string = ''; // Almacena el correo electrónico
  emailError: boolean = false; // Maneja el estado de error

  constructor(private modalController: ModalController) {}

  recoverPassword(email: string) {
    if (!email || email.trim() === '') {
      this.emailError = true;
      return;
    }

    console.log('Correo enviado para recuperación:', email);
    this.dismissModal();
  }

  validateEmail() {
    this.emailError = !this.email || this.email.trim() === '';
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
