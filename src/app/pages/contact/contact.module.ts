import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [
    ContactPage,
    AddContactComponent,
    UpdateContactComponent,
    DeleteContactComponent,
  ],
  entryComponents: [
    AddContactComponent,
    UpdateContactComponent,
    DeleteContactComponent,
  ],
})
export class ContactPageModule {}
