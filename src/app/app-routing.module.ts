import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { AuthGuard } from './services/auth/auth-guard';

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
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
