import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {

  capturedImage: string | undefined;

  constructor() { }

  // Método para tomar una foto
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Para obtener la imagen en base64
      source: CameraSource.Camera // Usa la cámara para tomar una nueva foto
    });

    this.capturedImage = 'data:image/jpeg;base64,' + image.base64String;
  }
}
