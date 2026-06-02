import {Device} from '../../../core/device/device.model';

export interface DeviceTrackerState {
  devices: Device[];
  selectedDevice: Device | null;

  loadingDevice: boolean,
  loadingDevices: boolean;

  error: any;
}

export const initialDeviceTrackerState: DeviceTrackerState = {
  devices: [],
  selectedDevice: null,

  loadingDevice: false,
  loadingDevices: false,

  error: null
};
