import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietePageRoutingModule } from './societe-routing.module';

import { SocietePage } from './societe.page';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddSocieteComponent } from './add-societe/add-societe.component';
import { UpdateSocieteComponent } from './update-societe/update-societe.component';
import { DeleteSocieteComponent } from './delete-societe/delete-societe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietePageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [
    SocietePage,
    AddSocieteComponent,
    UpdateSocieteComponent,
    DeleteSocieteComponent,
  ],
  entryComponents: [
    AddSocieteComponent,
    UpdateSocieteComponent,
    DeleteSocieteComponent,
  ],
})
export class SocietePageModule {}
