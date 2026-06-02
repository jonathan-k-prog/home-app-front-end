import { createReducer, on } from '@ngrx/store';
import { DevicesManagerActions } from './devices-manager.actions';
import { initialDevicesManagerState } from './devices-manager.state';

export const DevicesManagerReducer = createReducer(
  initialDevicesManagerState,

  on(DevicesManagerActions.addDevice, (state) => ({
    ...state,
    loadingDevices: true,
    error: null,
  })),
  on(DevicesManagerActions.addDeviceSuccess, (state, { device }) => ({
    ...state,
    devices: [...state.devices, device],
    loadingDevices: false,
    error: null,
  })),
  on(DevicesManagerActions.addDeviceFailure, (state, { error }) => ({
    ...state,
    loadingDevices: false,
    error,
  })),

  on(DevicesManagerActions.loadDevices, (state) => ({
    ...state,
    devices: [],
    loadingDevices: true,
    error: null,
  })),
  on(DevicesManagerActions.loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devices: devices,
    loadingDevices: false,
    error: null,
  })),
  on(DevicesManagerActions.loadDevicesFailure, (state, { error }) => ({
    ...state,
    loadingDevices: false,
    error,
  })),

  on(DevicesManagerActions.loadRooms, (state) => ({
    ...state,
    rooms: [],
    loadingRooms: true,
    error: null,
  })),
  on(DevicesManagerActions.loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms: rooms,
    loadingRooms: false,
    error: null,
  })),
  on(DevicesManagerActions.loadRoomsFailure, (state, { error }) => ({
    ...state,
    loadingRooms: false,
    error,
  })),

  on(DevicesManagerActions.updateDevice, (state) => ({
    ...state,
    loadingDevices: true,
    error: null,
  })),
  on(DevicesManagerActions.updateDeviceSuccess, (state, { device }) => ({
    ...state,
    devices: [...state.devices.filter(tmp => tmp.id !== device.id), device],
    loadingDevices: false,
    error: null,
  })),
  on(DevicesManagerActions.updateDeviceFailure, (state, { error }) => ({
    ...state,
    loadingDevices: false,
    error,
  })),

  on(DevicesManagerActions.deleteDevice, (state) => ({
    ...state,
    loadingDevices: true,
    error: null,
  })),
  on(DevicesManagerActions.deleteDeviceSuccess, (state, { device }) => ({
    ...state,
    devices: [...state.devices.filter(tmp => tmp.id !== device.id)],
    loadingDevices: false,
    error: null,
  })),
  on(DevicesManagerActions.deleteDeviceFailure, (state, { error }) => ({
    ...state,
    loadingDevices: false,
    error,
  })),

  on(DevicesManagerActions.reset, (state) => ({
    ...state,
  })),
);
