import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiominingPageRoutingModule } from './biomining-routing.module';

import { BiominingPage } from './biomining.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiominingPageRoutingModule
  ],
  declarations: [BiominingPage]
})
export class BiominingPageModule {}
