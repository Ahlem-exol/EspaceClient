import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth-gruad';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./pages/home/home.module').then((m) => m.HomePageModule),

  //   //canActivate: [AuthGuard],
  // },

  // {
  //   path: 'Login',
  //   component: LoginComponent,
  //   // loadChildren: () =>
  //   //   import('./pages/login/login.component').then((m) => m.LoginComponent),
  // },
  {
    path: '',
    redirectTo: '/authentication',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./pages/user/user.module').then((m) => m.UserPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./pages/authentication/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  {
    path: 'societe',
    loadChildren: () =>
      import('./pages/societe/societe.module').then((m) => m.SocietePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'projet',
    loadChildren: () => import('./pages/projet/projet.module').then( m => m.ProjetPageModule)
  },
  {
    path: 'lot',
    loadChildren: () => import('./pages/lot/lot.module').then( m => m.LotPageModule)
  },
  {
    path: 'client-desh',
    loadChildren: () => import('./pages/client-desh/client-desh.module').then( m => m.ClientDeshPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    NgxDatatableModule,
  ],
  exports: [RouterModule],

  providers: [AuthGuard],
})
export class AppRoutingModule {}
