import { Component } from '@angular/core';
import { toDataURL } from 'qrcode';
import { Share } from '@capacitor/share';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  clases: string[] = ['Matemáticas', 'Historia', 'Ciencias', 'Inglés']; // Clases disponibles
  selectedClass: string = ''; // Clase seleccionada
  qrCodeData: string | null = null; // QR generado

  // Generar el código QR
  async generateQR() {
    if (this.selectedClass) {
      try {
        this.qrCodeData = await toDataURL(this.selectedClass); // Generar el QR en base64
      } catch (err) {
        console.error('Error generando el QR:', err);
      }
    } else {
      alert('Por favor selecciona una clase');
    }
  }

  // Compartir el QR
  async shareQR() {
    if (this.qrCodeData) {
      try {
        // Guardar la imagen base64 como un archivo temporal
        const fileName = 'qr-code.png';
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: this.qrCodeData.split(',')[1], // Elimina el encabezado "data:image/png;base64,"
          directory: Directory.Cache, // Guardar en la carpeta de caché
          encoding: Encoding.UTF8, // Especifica que los datos están en base64
        });

        // Compartir el archivo
        await Share.share({
          title: 'Código QR de la Clase',
          text: `Aquí tienes el código QR de la clase seleccionada (${this.selectedClass}):`,
          url: savedFile.uri, // Ruta al archivo
          dialogTitle: 'Compartir Código QR',
        });
      } catch (error) {
        console.error('Error al compartir el QR:', error);
      }
    } else {
      alert('No hay ningún QR generado para compartir.');
    }
  }
}
