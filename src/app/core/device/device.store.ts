import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import {apiRxMethod} from '../store/api-rx-method';
import {Device, DeviceRequest} from './device.model';
import {DeviceApi} from './device.api';

interface DeviceState {
  devices: Device[];
  loadingDevices: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  devices: [],
  loadingDevices: false,
  error: null
};

export const DeviceStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    deviceApi = inject(DeviceApi),
    messageService = inject(MessageService)) => ({

    addDevice: apiRxMethod<DeviceRequest, Device, DeviceState>(
      store, messageService,
      (request) => deviceApi.add(request),
      (loadingDevices, error) => ({ loadingDevices, error }),
      (device) => ({ devices: [...store.devices(), device] }),
      {
        successSummary: 'Add Successful', successDetail: 'Device has been added successfully.',
        errorSummary: 'Add Failed', fallbackError: 'Device adding failed'
      },
    ),

    loadDevicesByHomeId: apiRxMethod<number, Device[], DeviceState>(
      store, messageService,
      (homeId) => deviceApi.getAll(null, null, homeId),
      (loadingDevices, error) => ({ loadingDevices, error }),
      (devices) => ({ devices }),
      {
        successSummary: 'Load Successful', successDetail: 'Devices have been loaded successfully.',
        errorSummary: 'Load Failed', fallbackError: 'Devices loading failed'
      },
    ),

    updateDevice: apiRxMethod<Device, Device, DeviceState>(
      store, messageService,
      (request) => deviceApi.update(request.id, { ...request, roomId: request.room.id}),
      (loadingDevices, error) => ({ loadingDevices, error }),
      (device) => ({ devices: [...store.devices().filter(d => d.id !== device.id), device] }),
      {
        successSummary: 'Update Successful', successDetail: 'Device has been updated successfully.',
        errorSummary: 'Update Failed', fallbackError: 'Device updating failed'
      },
    ),

    deleteDevice: apiRxMethod<Device, Device, DeviceState>(
      store, messageService,
      (request) => deviceApi.delete(request.id),
      (loadingDevices, error) => ({ loadingDevices, error }),
      (device) => ({ devices: [...store.devices().filter(d => d.id !== device.id)] }),
      {
        successSummary: 'Delete Successful', successDetail: 'Device has been deleted successfully.',
        errorSummary: 'Delete Failed', fallbackError: 'Device deleting failed'
      },
    ),

    reset() { patchState(store, initialState); },
  })),
);
