import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { apiRxMethod } from '../../core/store/api-rx-method';
import { Device } from '../../core/device/device.model';
import { DeviceApi } from '../../core/device/device.api';
import {Room} from '../../core/room/room.model';
import {RoomApi} from '../../core/room/room.api';

interface RoomTrackerState {
  selectedRoom: Room | null;
  loadingRoom: boolean;
  selectedDevices: Device[];
  loadingDevices: boolean;
  error: string | null;
}

const initialState: RoomTrackerState = {
  selectedRoom: null,
  loadingRoom: false,
  selectedDevices: [],
  loadingDevices: false,
  error: null,
};

export const RoomTrackerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    roomApi = inject(RoomApi),
    deviceApi = inject(DeviceApi),
    messageService = inject(MessageService)) => ({

    selectRoom(room: Room) {
      patchState(store, { selectedRoom: room });
    },

    unselectRoom() {
      patchState(store, { selectedRoom: null });
    },

    refreshRoom: apiRxMethod<number, Room, RoomTrackerState>(
      store, messageService,
      (id) => roomApi.getById(id),
      (loadingRoom, error) => ({ loadingRoom, error }),
      (room) => ({ selectedRoom: room }),
      {
        successSummary: 'Refresh Successful', successDetail: 'Room has been refreshed successfully.',
        errorSummary: 'Refresh Failed', fallbackError: 'Room refreshing failed'
      },
    ),

    refreshDevices: apiRxMethod<number, Device[], RoomTrackerState>(
      store, messageService,
      (roomId) => deviceApi.getAll(null, roomId, null),
      (loadingDevices, error) => ({ loadingDevices, error }),
      (devices) => ({ selectedDevices: devices }),
      {
        successSummary: 'Refresh Successful', successDetail: 'Devices have been refreshed successfully.',
        errorSummary: 'Refresh Failed', fallbackError: 'Devices refreshing failed'
      },
    ),

    reset() { patchState(store, initialState); },
  })),

);
