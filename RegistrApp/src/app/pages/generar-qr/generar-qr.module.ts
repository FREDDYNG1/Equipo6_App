import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenerarQrPageRoutingModule } from './generar-qr-routing.module';
import { GenerarQrPage } from './generar-qr.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarQrPageRoutingModule,
    ComponentsModule,
    QrCodeModule
  ],
  declarations: [GenerarQrPage]
})
export class GenerarQrPageModule {}
