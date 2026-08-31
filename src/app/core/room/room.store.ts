import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import {apiRxMethod} from '../store/api-rx-method';
import {Room, RoomRequest} from './room.model';
import {RoomApi} from './room.api';

interface RoomState {
  rooms: Room[];
  loadingRooms: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  loadingRooms: false,
  error: null
};

export const RoomStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    roomApi = inject(RoomApi),
    messageService = inject(MessageService)) => ({

    addRoom: apiRxMethod<RoomRequest, Room, RoomState>(
      store, messageService,
      (request) => roomApi.add(request),
      (loadingRooms, error) => ({ loadingRooms, error }),
      (room) => ({ rooms: [...store.rooms(), room] }),
      {
        successSummary: 'Add Successful', successDetail: 'Room has been added successfully.',
        errorSummary: 'Add Failed', fallbackError: 'Room adding failed'
      },
    ),

    loadRoomsByHomeId: apiRxMethod<number, Room[], RoomState>(
      store, messageService,
      (homeId) => roomApi.getAll(homeId),
      (loadingRooms, error) => ({ loadingRooms, error }),
      (rooms) => ({ rooms }),
      {
        successSummary: 'Load Successful', successDetail: 'Rooms have been loaded successfully.',
        errorSummary: 'Load Failed', fallbackError: 'Rooms loading failed'
      },
    ),

    updateRoom: apiRxMethod<Room, Room, RoomState>(
      store, messageService,
      (request) => roomApi.update(request.id, { ...request, homeId: request.home.id}),
      (loadingRooms, error) => ({ loadingRooms, error }),
      (room) => ({ rooms: [...store.rooms().filter(r => r.id !== room.id), room] }),
      {
        successSummary: 'Update Successful', successDetail: 'Room has been updated successfully.',
        errorSummary: 'Update Failed', fallbackError: 'Room updating failed'
      },
    ),

    deleteRoom: apiRxMethod<Room, Room, RoomState>(
      store, messageService,
      (request) => roomApi.delete(request.id),
      (loadingRooms, error) => ({ loadingRooms, error }),
      (room) => ({ rooms: [...store.rooms().filter(r => r.id !== room.id)] }),
      {
        successSummary: 'Delete Successful', successDetail: 'Room has been deleted successfully.',
        errorSummary: 'Delete Failed', fallbackError: 'Room deleting failed'
      },
    ),

    reset() { patchState(store, initialState); },
  })),
);
