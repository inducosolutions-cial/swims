import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagemeterialPage } from './managemeterial.page';

const routes: Routes = [
  {
    path: '',
    component: ManagemeterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagemeterialPageRoutingModule {}
