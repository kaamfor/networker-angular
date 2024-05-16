import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/shared/models/Device';
import { DeviceInterface } from 'src/app/shared/models/DeviceInterface';
import { PortForward } from 'src/app/shared/models/PortForward';
import { DeviceService } from 'src/app/shared/services/device.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
  deviceId: string = '';
  device?: Device = undefined;
  loadingFinished: boolean = false;

  constructor(private actRoute: ActivatedRoute, private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe((param: any) => {
      this.deviceId = param.deviceId as string;

      let action = this.deviceService.getById('K1CWREsh77f4RN28t2aJPIbjF9P2', this.deviceId).subscribe(
        device => {
          this.device = device
          this.loadingFinished = true;
          action.unsubscribe();
        });
    })
  }

  interfaceListSubmitted(interfaceList: DeviceInterface[]) {
    if (this.device !== undefined) {
      this.device.settings.interfaceList = interfaceList;
      this.deviceService.update('K1CWREsh77f4RN28t2aJPIbjF9P2', this.device).then(console.log);
    }
  }

  portForwardListSubmitted(portForwardList: PortForward[]) {
    if (this.device !== undefined) {
      this.device.settings.portForwards = portForwardList;
      this.deviceService.update('K1CWREsh77f4RN28t2aJPIbjF9P2', this.device).then(console.log);
    }
  }
}
