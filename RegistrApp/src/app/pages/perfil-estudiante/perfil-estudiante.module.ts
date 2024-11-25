import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEstudiantePageRoutingModule } from './perfil-estudiante-routing.module';

import { PerfilEstudiantePage } from './perfil-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilEstudiantePageRoutingModule
  ],
  declarations: [PerfilEstudiantePage]
})
export class PerfilEstudiantePageModule {}
