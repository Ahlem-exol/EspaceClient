import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxDatatableModule],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
