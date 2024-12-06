import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarClasePageRoutingModule } from './visualizar-clase-routing.module';

import { VisualizarClasePage } from './visualizar-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarClasePageRoutingModule
  ],
  declarations: [VisualizarClasePage]
})
export class VisualizarClasePageModule {}
