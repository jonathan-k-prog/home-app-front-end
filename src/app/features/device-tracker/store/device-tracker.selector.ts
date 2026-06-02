import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceTrackerState } from './device-tracker.state';

export const selectDeviceTrackerState =
  createFeatureSelector<DeviceTrackerState>('deviceTracker');

export const DeviceTrackerSelectors = {
  devices: createSelector(
    selectDeviceTrackerState,
    state => state.devices
  ),

  selectedDevice: createSelector(
    selectDeviceTrackerState,
    state => state.selectedDevice
  ),

  loadingDevices: createSelector(
    selectDeviceTrackerState,
    state => state.loadingDevices
  ),
};
