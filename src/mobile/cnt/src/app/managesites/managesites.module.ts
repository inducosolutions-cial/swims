import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagesitesPageRoutingModule } from './managesites-routing.module';

import { ManagesitesPage } from './managesites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ManagesitesPageRoutingModule
  ],
  declarations: [ManagesitesPage]
})
export class ManagesitesPageModule { }
