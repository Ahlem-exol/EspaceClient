import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LotPageRoutingModule } from './lot-routing.module';

import { LotPage } from './lot.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddLotComponent } from './add-lot/add-lot.component';
import { UpdateLotComponent } from './update-lot/update-lot.component';
import { DeleteLotComponent } from './delete-lot/delete-lot.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LotPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [
    LotPage,
    AddLotComponent,
    UpdateLotComponent,
    DeleteLotComponent,
  ],
  entryComponents: [AddLotComponent, UpdateLotComponent, DeleteLotComponent],
})
export class LotPageModule {}
