import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDeshPageRoutingModule } from './client-desh-routing.module';

import { ClientDeshPage } from './client-desh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientDeshPageRoutingModule
  ],
  declarations: [ClientDeshPage]
})
export class ClientDeshPageModule {}
