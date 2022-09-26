import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountsPageRoutingModule } from './amounts-routing.module';

import { AmountsPage } from './amounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmountsPageRoutingModule
  ],
  declarations: [AmountsPage]
})
export class AmountsPageModule {}
