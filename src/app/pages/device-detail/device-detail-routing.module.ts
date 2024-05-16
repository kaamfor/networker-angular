import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDetailComponent } from './device-detail.component';

const routes: Routes = [
  {
    path: ':deviceId',
    component: DeviceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceDetailRoutingModule { }
