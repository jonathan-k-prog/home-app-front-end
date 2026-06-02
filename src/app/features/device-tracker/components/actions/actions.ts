import { Component, Input, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { Store } from '@ngrx/store';
import { Device } from '../../../../core/device/device.model';
import { Room } from '../../../../core/room/room.model';
import { CommonModalAddDeviceComponent } from '../../../common/modal/add/device/device';
import { DeviceTrackerActions } from '../../store/device-tracker.actions';
import {CommonModalSelectDeviceComponent} from '../../../common/modal/select/device/device';


@Component({
  selector: 'device-tracker-actions',
  imports: [
    Button,
    CommonModalSelectDeviceComponent,
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  @Input() selectedDevice: Device | null = null;
  @Input() devices: Device[] = [];
  @Input() loadingDevices: boolean = false;

  @ViewChild(CommonModalSelectDeviceComponent) commonModalSelectDevice!: CommonModalSelectDeviceComponent;

  constructor(
    private store: Store,
  ) {}

  protected select() {
    this.commonModalSelectDevice.showModal();
  }

  protected unselect() {
    this.store.dispatch(DeviceTrackerActions.unselectDevice());
  }

  protected selectSubmit(device: Device) {
    console.log(device);
    this.store.dispatch(DeviceTrackerActions.selectDevice({ device }));
  }

  protected refresh() {
    this.store.dispatch(DeviceTrackerActions.reset());
  }
}
