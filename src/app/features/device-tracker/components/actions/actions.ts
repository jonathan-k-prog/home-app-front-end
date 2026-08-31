import {Component, ViewChild, inject, input} from '@angular/core';
import { Button } from 'primeng/button';
import { Device } from '../../../../core/device/device.model';
import { CommonModalSelectDeviceComponent } from '../../../common/modal/select/device/device';
import { DeviceTrackerStore } from '../../device-tracker.store';


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

  selectedDevice = input<Device | null>(null);
  devices = input<Device[]>([]);
  loadingDevices = input<boolean>(false);

  @ViewChild(CommonModalSelectDeviceComponent) commonModalSelectDevice!: CommonModalSelectDeviceComponent;

  protected deviceTrackerStore = inject(DeviceTrackerStore);

  protected select() {
    this.commonModalSelectDevice.showModal();
  }

  protected unselect() {
    this.deviceTrackerStore.unselectDevice();
  }

  protected selectSubmit(device: Device) {
    this.deviceTrackerStore.selectDevice(device);
  }

  protected refresh() {
    this.deviceTrackerStore.unselectDevice();
  }
}
