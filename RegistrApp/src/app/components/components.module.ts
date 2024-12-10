import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerCargaComponent } from './spinner-carga/spinner-carga.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { RecoveryModalComponent } from './recovery-modal/recovery-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SpinnerCargaComponent,
    HeaderComponent,
    FooterComponent,
    MenuLateralComponent,
    RecoveryModalComponent,

  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    SpinnerCargaComponent,
    HeaderComponent,
    FooterComponent,
    MenuLateralComponent,
    RecoveryModalComponent,
  ]
})
export class ComponentsModule { }
