import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceListRoutingModule } from './device-list-routing.module';
import { DeviceListComponent } from './device-list.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DeviceListComponent
  ],
  imports: [
    CommonModule,
    DeviceListRoutingModule,
    MatIconModule
  ]
})
export class DeviceListModule { }
