import {Room} from '../../../core/room/room.model';

export interface RoomsManagerState {
  rooms: Room[];

  loadingRooms: boolean;

  error: any;
}

export const initialRoomsManagerState: RoomsManagerState = {
  rooms: [],

  loadingRooms: false,

  error: null
};
