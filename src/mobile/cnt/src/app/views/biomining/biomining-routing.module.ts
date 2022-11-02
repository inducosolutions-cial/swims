import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiominingPage } from './biomining.page';

const routes: Routes = [
  {
    path: '',
    component: BiominingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiominingPageRoutingModule {}
