import { createReducer, on } from '@ngrx/store';
import { DeviceTrackerActions } from './device-tracker.actions';
import { initialDeviceTrackerState } from './device-tracker.state';
import {DevicesManagerActions} from '../../devices-manager/store/devices-manager.actions';

export const DeviceTrackerReducer = createReducer(
  initialDeviceTrackerState,

  on(DeviceTrackerActions.selectDevice, (state, { device }) => ({
    ...state,
    selectedDevice: device,
  })),
  on(DeviceTrackerActions.unselectDevice, (state) => ({
    ...state,
    selectedDevice: null,
  })),

  on(DeviceTrackerActions.refreshDevice, (state) => ({
    ...state,
    loadingDevice: true,
    error: null,
  })),
  on(DeviceTrackerActions.refreshDeviceSuccess, (state, { device }) => ({
    ...state,
    selectedDevice: device,
    loadingDevice: false,
    error: null,
  })),
  on(DeviceTrackerActions.refreshDeviceFailure, (state, { error }) => ({
    ...state,
    loadingDevice: false,
    error,
  })),

  on(DeviceTrackerActions.loadDevices, (state) => ({
    ...state,
    devices: [],
    loadingDevices: true,
    error: null,
  })),
  on(DeviceTrackerActions.loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devices: devices,
    loadingDevices: false,
    error: null,
  })),
  on(DeviceTrackerActions.loadDevicesFailure, (state, { error }) => ({
    ...state,
    loadingDevices: false,
    error,
  })),

  on(DeviceTrackerActions.reset, state => ({
    ...state,
  })),
);
