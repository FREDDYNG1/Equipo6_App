import { Component } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  qrText = ''; // Texto del QR
  qrLinks: { text: string; link: string; type: string }[] = []; // Lista de enlaces

  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ) {}

  /**
   * Captura el contenido del elemento y lo comparte o descarga.
   */
  async captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    if (!element) {
      console.error('Elemento con id "qrImage" no encontrado.');
      return;
    }

    const canvas = await html2canvas(element);
    const base64 = canvas.toDataURL().split(',')[1];
    const path = `qr_${new Date().getTime()}.png`; // Nombre único para el archivo

    if (this.platform.is('capacitor')) {
      await this.shareImage(canvas, base64, path);
    } else {
      this.downloadImage(canvas);
      this.addToList(path); // Agregar el QR a la lista en el navegador
    }
  }

  /**
   * Comparte la imagen generada.
   */
  async shareImage(canvas: HTMLCanvasElement, base64: string, path: string) {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Preparando imagen...',
    });
    await loading.present();

    try {
      const image = canvas.toDataURL('image/png'); // Base64 URL para compartir

      // Compartir usando Capacitor Share
      await Share.share({
        title: 'Código QR Generado',
        text: 'Aquí está tu código QR generado:',
        url: image, // Base64 o enlace del QR
        dialogTitle: 'Compartir Código QR',
      });

      this.addToList(path); // Agregar el enlace QR a la lista
    } catch (error) {
      console.error('Error al compartir la imagen:', error);
    } finally {
      await loading.dismiss();
    }
  }

  /**
   * Descarga la imagen generada en el navegador.
   */
  downloadImage(canvas: HTMLCanvasElement) {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'qr-code.png';
    link.click();
  }

  /**
   * Agregar el enlace QR a la lista.
   */
  addToList(link: string) {
    const type = this.qrText.toLowerCase().includes('profesor') ? 'profesor' : 'alumno';
    this.qrLinks.push({ text: this.qrText, link, type });
  }
}

