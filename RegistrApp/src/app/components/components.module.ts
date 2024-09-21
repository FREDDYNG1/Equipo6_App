import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerCargaComponent } from './spinner-carga/spinner-carga.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';



@NgModule({
  declarations: [
    SpinnerCargaComponent,
    HeaderComponent,
    FooterComponent,
    MenuLateralComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    SpinnerCargaComponent,
    HeaderComponent,
    FooterComponent,
    MenuLateralComponent
  ]
})
export class ComponentsModule { }
