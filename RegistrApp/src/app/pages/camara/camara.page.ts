import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  scanResult: string = '';

  constructor(private platform: Platform, private modalController: ModalController) {}

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        format: [],
        LensFacing: LensFacing.Back,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.scanResult = data?.text || data?.barcode?.displayValue || 'No se obtuvo información';
    }
  }

  async selectImage() {

      const result = await FilePicker.pickFiles({
        types: ['image/png'],
      });

    return
  }

  sendEmail(scanData: string) {
    if (!scanData) {
      alert('No se detectó ningún código para enviar.');
      return;
    }

    const mailtoLink = `mailto:docente@ejemplo.com?subject=Resultado del Escaneo&body=Información escaneada: ${encodeURIComponent(
      scanData
    )}`;
    window.open(mailtoLink, '_system');
  }
}
