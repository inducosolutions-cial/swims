import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmountsPage } from './amounts.page';

const routes: Routes = [
  {
    path: '',
    component: AmountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmountsPageRoutingModule {}
