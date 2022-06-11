import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from 'src/app/services/auth/auth-gruad';

import { SocietePage } from './societe.page';

const routes: Routes = [
  {
    path: '',
    component: SocietePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, NgxDatatableModule],
  providers: [AuthGuard],
})
export class SocietePageRoutingModule {}
