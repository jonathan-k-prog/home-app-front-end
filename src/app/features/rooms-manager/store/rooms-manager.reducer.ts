import { createReducer, on } from '@ngrx/store';
import { RoomsManagerActions } from './rooms-manager.actions';
import { initialRoomsManagerState } from './rooms-manager.state';

export const RoomsManagerReducer = createReducer(
  initialRoomsManagerState,

  on(RoomsManagerActions.addRoom, (state) => ({
    ...state,
    loadingRooms: true,
    error: null,
  })),
  on(RoomsManagerActions.addRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms, room],
    loadingRooms: false,
    error: null,
  })),
  on(RoomsManagerActions.addRoomFailure, (state, { error }) => ({
    ...state,
    loadingRooms: false,
    error,
  })),

  on(RoomsManagerActions.loadRooms, (state) => ({
    ...state,
    rooms: [],
    loadingRooms: true,
    error: null,
  })),
  on(RoomsManagerActions.loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms: rooms,
    loadingRooms: false,
    error: null,
  })),
  on(RoomsManagerActions.loadRoomsFailure, (state, { error }) => ({
    ...state,
    loadingRooms: false,
    error,
  })),

  on(RoomsManagerActions.updateRoom, (state) => ({
    ...state,
    loadingRooms: true,
    error: null,
  })),
  on(RoomsManagerActions.updateRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms.filter(tmp => tmp.id !== room.id), room],
    loadingRooms: false,
    error: null,
  })),
  on(RoomsManagerActions.updateRoomFailure, (state, { error }) => ({
    ...state,
    loadingRooms: false,
    error,
  })),

  on(RoomsManagerActions.deleteRoom, (state) => ({
    ...state,
    loadingRooms: true,
    error: null,
  })),
  on(RoomsManagerActions.deleteRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms.filter(tmp => tmp.id !== room.id)],
    loadingRooms: false,
    error: null,
  })),
  on(RoomsManagerActions.deleteRoomFailure, (state, { error }) => ({
    ...state,
    loadingRooms: false,
    error,
  })),

  on(RoomsManagerActions.reset, (state) => ({
    ...state,
  })),
);
