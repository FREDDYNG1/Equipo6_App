import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAlumnoPageRoutingModule } from './home-alumno-routing.module';

import { HomeAlumnoPage } from './home-alumno.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAlumnoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomeAlumnoPage]
})
export class HomeAlumnoPageModule {}
