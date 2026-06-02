import {Room} from '../../../core/room/room.model';
import {Device} from '../../../core/device/device.model';

export interface DevicesManagerState {
  devices: Device[];
  rooms: Room[];

  loadingDevices: boolean;
  loadingRooms: boolean;

  error: any;
}

export const initialDevicesManagerState: DevicesManagerState = {
  devices: [],
  rooms: [],

  loadingDevices: false,
  loadingRooms: false,

  error: null
};
