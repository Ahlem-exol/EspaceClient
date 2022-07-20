import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjetPageRoutingModule } from './projet-routing.module';

import { ProjetPage } from './projet.page';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { UpdateProjetComponent } from './update-projet/update-projet.component';
import { DeleteProjetComponent } from './delete-projet/delete-projet.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjetPageRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProjetPage,
    AddProjetComponent,
    UpdateProjetComponent,
    DeleteProjetComponent,
  ],
  entryComponents: [
    AddProjetComponent,
    UpdateProjetComponent,
    DeleteProjetComponent,
  ],
})
export class ProjetPageModule {}
