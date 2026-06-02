import {Component, Input, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Skeleton} from 'primeng/skeleton';
import {Store} from '@ngrx/store';
import {Device} from '../../../../core/device/device.model';
import {CommonModalUpdateDeviceComponent} from '../../../common/modal/update/device/device';
import {CommonModalDeleteDeviceComponent} from '../../../common/modal/delete/device/device';
import {DevicesManagerActions} from '../../store/devices-manager.actions';
import {Room} from '../../../../core/room/room.model';

@Component({
  selector: 'devices-manager-table',
  imports: [
    TableModule,
    Button,
    Skeleton,
    CommonModalUpdateDeviceComponent,
    CommonModalDeleteDeviceComponent,
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() devices: Device[] = [];
  @Input() rooms: Room[] = [];
  @Input() loadingDevices: boolean = false;
  @Input() loadingRooms: boolean = false;

  @ViewChild(CommonModalUpdateDeviceComponent) commonModalUpdateDevice!: CommonModalUpdateDeviceComponent;
  @ViewChild(CommonModalDeleteDeviceComponent) commonModalDeleteDevice!: CommonModalDeleteDeviceComponent;

  constructor(
    private store: Store
  ) {}

  protected update(device: Device) {
    this.commonModalUpdateDevice.showModal(device);
  }

  protected updateSubmit(device: Device) {
    this.store.dispatch(DevicesManagerActions.updateDevice({device}));
  }

  protected delete(device: Device) {
    this.commonModalDeleteDevice.showModal(device);
  }

  protected deleteSubmit(device: Device) {
    this.store.dispatch(DevicesManagerActions.deleteDevice({device}));
  }
}
