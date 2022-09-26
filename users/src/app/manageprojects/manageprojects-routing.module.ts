import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageprojectsPage } from './manageprojects.page';

const routes: Routes = [
  {
    path: '',
    component: ManageprojectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageprojectsPageRoutingModule {}
