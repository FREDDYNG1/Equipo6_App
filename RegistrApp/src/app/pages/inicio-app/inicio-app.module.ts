import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioAppPageRoutingModule } from './inicio-app-routing.module';

import { InicioAppPage } from './inicio-app.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioAppPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InicioAppPage]
})
export class InicioAppPageModule {}
