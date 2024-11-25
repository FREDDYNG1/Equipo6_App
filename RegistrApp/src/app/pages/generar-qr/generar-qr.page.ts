import { Component } from '@angular/core';
import { Directory, Filesystem, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage {
  qrText = '';

  constructor(private loadingController: LoadingController) {}

  async shareImage(canvas: HTMLCanvasElement) {
    // Eliminar prefijo Base64
    let base64 = canvas.toDataURL().split(',')[1];
    let path = 'qr.png';

    // Mostrar el loading spinner
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: 'Preparando imagen...',
    });
    await loading.present();

    try {
      // Guardar la imagen como archivo temporal
      const writeResult = await Filesystem.writeFile({
        path,
        data: base64,
        directory: Directory.Cache,
      });

      const uri = writeResult.uri;

      // Compartir el archivo
      await Share.share({
        url: uri,
        text: 'Aquí está tu código QR',
        title: 'Compartir QR',
      });

      // Eliminar el archivo temporal
      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache,
      });
    } catch (error) {
      console.error('Error al compartir la imagen:', error);
    } finally {
      // Ocultar el loading spinner
      await loading.dismiss();
    }
  }
}
