import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Device } from '../models/Device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private userCollectionName: string = 'users';
  private collectionName: string = 'devices';
  constructor(private afs: AngularFirestore) { }

  create(userId: string, device: Device) {
    device.id = this.afs.createId();
    //return this.afs.collection<Device>(this.collectionName).doc(device.id).set(device);
    return this.afs.collection<Device>('users/' + userId + '/' + this.collectionName).doc(device.id).set(device);
  }

  buildDeviceFromName(deviceName: string) {
    return {
      id: this.afs.createId(),
      name: deviceName,
      settings: {
        interfaceList: [],
        portForwards: []
      }
    } as Device;
  }

  getAll(userId: string) {
    return this.afs.collection<Device>('users/' + userId + '/' + this.collectionName).valueChanges();
  }

  getById(userId: string, id: string) {
    return this.afs.collection<Device>('users/' + userId + '/' + this.collectionName).doc(id).valueChanges();
  }
  
  update(userId: string, device: Device) {
    return this.afs.collection<Device>('users/' + userId + '/' + this.collectionName).doc(device.id).set(device);
  }

  delete(userId: string, id: string) {
    return this.afs.collection<Device>('users/' + userId + '/' + this.collectionName).doc(id).delete();
  }
}
