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
