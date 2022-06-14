import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientDeshPage } from './client-desh.page';

const routes: Routes = [
  {
    path: '',
    component: ClientDeshPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDeshPageRoutingModule {}
