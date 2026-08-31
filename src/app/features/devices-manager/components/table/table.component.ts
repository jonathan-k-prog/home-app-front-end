import {Component, inject, input, Input, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Skeleton} from 'primeng/skeleton';
import {Device} from '../../../../core/device/device.model';
import {CommonModalUpdateDeviceComponent} from '../../../common/modal/update/device/device';
import {CommonModalDeleteDeviceComponent} from '../../../common/modal/delete/device/device';
import {Room} from '../../../../core/room/room.model';
import {Tag} from 'primeng/tag';
import {DateFormatter} from '../../../../core/date/date.formatter';
import {Router} from '@angular/router';
import {DevicesManagerStore} from '../../devices-manager.store';
import {DeviceStore} from '../../../../core/device/device.store';

@Component({
  selector: 'devices-manager-table',
  imports: [
    TableModule,
    Button,
    Skeleton,
    CommonModalUpdateDeviceComponent,
    CommonModalDeleteDeviceComponent,
    Tag,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class DevicesManagerTableComponent {
  devices = input<Device[]>([]);
  loadingDevices = input<boolean>(false);
  rooms = input<Room[]>([]);
  loadingRooms = input<boolean>(false);

  @ViewChild(CommonModalUpdateDeviceComponent) commonModalUpdateDevice!: CommonModalUpdateDeviceComponent;
  @ViewChild(CommonModalDeleteDeviceComponent) commonModalDeleteDevice!: CommonModalDeleteDeviceComponent;

  private devicesManagerStore = inject(DevicesManagerStore);
  private deviceStore = inject(DeviceStore);

  private router = inject(Router);
  protected dateFormatter = inject(DateFormatter);


  protected track(device: Device) {
    //this.store.dispatch(DeviceTrackerActions.reset());
    //this.store.dispatch(DeviceTrackerActions.selectDevice({ device }));
    this.router.navigate(['/device-tracker']);
  }

  protected update(device: Device) {
    this.commonModalUpdateDevice.showModal(device);
  }

  protected updateSubmit(device: Device) {
    this.deviceStore.updateDevice(device);
  }

  protected delete(device: Device) {
    this.commonModalDeleteDevice.showModal(device);
  }

  protected deleteSubmit(device: Device) {
    this.deviceStore.deleteDevice(device);
  }

  protected switchOff(device: Device) {
    this.devicesManagerStore.commandDevice({device, action: 'OFF'});
  }

  protected switchOn(device: Device) {
    this.devicesManagerStore.commandDevice({device, action: 'ON'});
  }
}
