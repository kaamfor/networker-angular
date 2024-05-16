import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../shared/services/device.service';
import { Device } from 'src/app/shared/models/Device';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  deviceList: Array<Device> = new Array();
  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    // TODO
    let action = this.deviceService.getAll('j49EsvUDYRWCMUadsPfnNiVFKlo1').subscribe(
      item => {
        this.deviceList = item;
        console.log(item)
        action.unsubscribe();
      })
  }

  createDevice(name: string): void {
    this.deviceService.create(
      'j49EsvUDYRWCMUadsPfnNiVFKlo1',
      this.deviceService.buildDeviceFromName(name)
    );
  }

  // folyt. köv: auth-guard, authentikáció, de a legfontosabb a menü/navigáció

  deleteDevice(deviceId: string): void {
    this.deviceService.delete('j49EsvUDYRWCMUadsPfnNiVFKlo1', deviceId);
  }
}
