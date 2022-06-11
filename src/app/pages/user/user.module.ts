import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [
    UserPage,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
  ],
  entryComponents: [AddUserComponent, UpdateUserComponent, DeleteUserComponent],
})
export class UserPageModule {}
