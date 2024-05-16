import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'devices', loadChildren: () => import('./pages/device-list/device-list.module').then(m => m.DeviceListModule) },
  { path: 'device', loadChildren: () => import('./pages/device-detail/device-detail.module').then(m => m.DeviceDetailModule) },
  {
    path: '',
    redirectTo: '/devices',
    pathMatch: 'full'
  },
  {
    path: '*',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
