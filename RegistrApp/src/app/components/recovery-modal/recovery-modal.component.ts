import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-modal',
  templateUrl: './recovery-modal.component.html',
  styleUrls: ['./recovery-modal.component.scss'],
})
export class RecoveryModalComponent {
  email: string = ''; // Almacena el correo electrónico
  emailError: boolean = false; // Maneja el estado de error

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  recoverPassword(email: string): void {
    if (
      !email ||
      email.trim() === '' ||
      !this.isValidEmail(email) ||
      !this.isValidDomain(email)
    ) {
      this.emailError = true;
      return;
    }

    console.log('Correo enviado para recuperación:', email);

    this.dismissModal();
    this.router.navigate(['/login']);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidDomain(email: string): boolean {
    const domain = email.split('@')[1];
    return domain === 'alumno.com' || domain === 'docente.com';
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
