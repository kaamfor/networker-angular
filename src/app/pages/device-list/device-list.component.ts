import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeviceService } from '../../shared/services/device.service';
import { Device } from 'src/app/shared/models/Device';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  deviceList: Array<Device> = new Array();

  deviceObservable?: Subscription;

  constructor(private router: Router, private deviceService: DeviceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.deviceObservable = this.deviceService.getAll(this.userId as string).subscribe(
      item => {
        this.deviceList = item;
      },
    reason => {
      console.log(reason);
      
      this.deviceObservable?.unsubscribe();
      this.deviceObservable = undefined;
    })
  }

  ngOnDestroy(): void {
    this.deviceObservable?.unsubscribe();
    this.deviceObservable = undefined;
  }

  get userId() {
    return JSON.parse(localStorage.getItem('userId') as string);
  }

  addNewDevice(newName: HTMLInputElement) {
    let id = this.createDevice(newName.value);
    this.router.navigateByUrl('/device/'+id);
  }

  createDevice(name: string): string {
    let skeleton = this.deviceService.buildDeviceFromName(name);
    this.deviceService.create(
      this.userId as string,
      skeleton
    );
    return skeleton.id;
  }

  // folyt. köv: auth-guard, authentikáció, de a legfontosabb a menü/navigáció

  deleteDevice(deviceId: string): void {
    this.deviceService.delete(this.userId as string, deviceId);
  }
}
