import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ContactPage } from './contact.page';

const routes: Routes = [
  {
    path: '',
    component: ContactPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxDatatableModule],
  exports: [RouterModule],
})
export class ContactPageRoutingModule {}
