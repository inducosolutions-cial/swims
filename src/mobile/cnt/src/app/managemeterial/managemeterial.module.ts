import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagemeterialPageRoutingModule } from './managemeterial-routing.module';

import { ManagemeterialPage } from './managemeterial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ManagemeterialPageRoutingModule
  ],
  declarations: [ManagemeterialPage]
})
export class ManagemeterialPageModule { }
