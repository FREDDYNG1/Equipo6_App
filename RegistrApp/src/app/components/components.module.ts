import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerCargaComponent } from './spinner-carga/spinner-carga.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SpinnerCargaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SpinnerCargaComponent
  ]
})
export class ComponentsModule { }
