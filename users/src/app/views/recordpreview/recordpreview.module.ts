import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordpreviewPageRoutingModule } from './recordpreview-routing.module';

import { RecordpreviewPage } from './recordpreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordpreviewPageRoutingModule
  ],
  declarations: [RecordpreviewPage]
})
export class RecordpreviewPageModule {}
