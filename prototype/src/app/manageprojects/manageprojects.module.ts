import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageprojectsPageRoutingModule } from './manageprojects-routing.module';

import { ManageprojectsPage } from './manageprojects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ManageprojectsPageRoutingModule
  ],
  declarations: [ManageprojectsPage]
})
export class ManageprojectsPageModule { }
