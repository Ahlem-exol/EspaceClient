import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDeshPageRoutingModule } from './client-desh-routing.module';

import { ClientDeshPage } from './client-desh.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientDeshPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ClientDeshPage],
})
export class ClientDeshPageModule {}
