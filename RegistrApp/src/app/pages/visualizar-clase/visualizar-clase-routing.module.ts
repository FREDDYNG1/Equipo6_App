import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarClasePage } from './visualizar-clase.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarClasePageRoutingModule {}
