import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {

  name: string = ''; // Nombre que se usará para generar el QR
  qrCodeImage: string | undefined; // Imagen del QR

  constructor() { }


  // Método para generar el código QR basado en el valor de 'name'
  generateQRCode() {
    if (!this.name) {
      alert('Por favor ingrese un nombre para generar el código QR.');
      return;
    }

    QRCode.toDataURL(this.name, { width: 300, margin: 2 }, (err, url) => {
      if (err) {
        console.error('Error generando el código QR:', err);
        return;
      }
      this.qrCodeImage = url; // Guarda la URL de la imagen QR generada
    });
  }

  // Método para compartir el código QR
  async shareQRCode() {
    if (!this.qrCodeImage) {
      alert('Primero debe generar un código QR para compartirlo.');
      return;
    }

    try {
      await Share.share({
        title: 'Código QR Generado',
        text: 'Aquí tienes el código QR que he generado',
        url: this.qrCodeImage,
        dialogTitle: 'Compartir Código QR',
      });
    } catch (error) {
      console.error('Error al compartir el código QR:', error);
    }
  }
}
