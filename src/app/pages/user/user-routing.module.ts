import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthGuard } from 'src/app/services/auth/auth-gruad';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxDatatableModule],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class UserPageRoutingModule {}
