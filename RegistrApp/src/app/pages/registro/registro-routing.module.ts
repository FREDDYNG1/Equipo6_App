import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';

import { IonicStorageModule } from '@ionic/storage-angular';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot()
  ],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
