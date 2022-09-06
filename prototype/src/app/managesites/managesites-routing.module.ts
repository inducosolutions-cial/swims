import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagesitesPage } from './managesites.page';

const routes: Routes = [
  {
    path: '',
    component: ManagesitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagesitesPageRoutingModule {}
