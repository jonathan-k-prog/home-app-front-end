import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { apiRxMethod } from '../../core/store/api-rx-method';
import { Device } from '../../core/device/device.model';
import { DeviceApi } from '../../core/device/device.api';

interface DeviceTrackerState {
  selectedDevice: Device | null;
  loadingDevice: boolean;
  error: string | null;
}

const initialState: DeviceTrackerState = {
  selectedDevice: null,
  loadingDevice: false,
  error: null,
};

export const DeviceTrackerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    deviceApi = inject(DeviceApi),
    messageService = inject(MessageService)) => ({

    selectDevice(device: Device) {
      patchState(store, { selectedDevice: device });
    },

    unselectDevice() {
      patchState(store, { selectedDevice: null });
    },

    refreshDevice: apiRxMethod<number, Device, DeviceTrackerState>(
      store, messageService,
      (id) => deviceApi.getById(id),
      (loadingDevice, error) => ({ loadingDevice, error }),
      (device) => ({ selectedDevice: device }),
      {
        successSummary: 'Refresh Successful', successDetail: 'Device has been refreshed successfully.',
        errorSummary: 'Refresh Failed', fallbackError: 'Device refreshing failed'
      },
    ),

    reset() { patchState(store, initialState); },
  })),
);
