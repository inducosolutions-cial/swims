import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordpreviewPage } from './recordpreview.page';

const routes: Routes = [
  {
    path: '',
    component: RecordpreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordpreviewPageRoutingModule {}
