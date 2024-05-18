import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { DeviceDetailRoutingModule } from './device-detail-routing.module';
import { DeviceDetailComponent } from './device-detail.component';
import { InterfaceEditorComponent } from './interface-editor/interface-editor.component';
import { PortforwardingEditorComponent } from './portforwarding-editor/portforwarding-editor.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DeviceDetailComponent,
    InterfaceEditorComponent,
    PortforwardingEditorComponent
  ],
  imports: [
    CommonModule,
    DeviceDetailRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class DeviceDetailModule { }
