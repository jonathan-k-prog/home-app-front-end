import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DevicesManagerState } from './devices-manager.state';

export const selectDevicesManagerState =
  createFeatureSelector<DevicesManagerState>('devicesManager');

export const DevicesManagerSelectors = {
  devices: createSelector(
    selectDevicesManagerState,
    state => state.devices
  ),

  rooms: createSelector(
    selectDevicesManagerState,
    state => state.rooms
  ),

  loadingDevices: createSelector(
    selectDevicesManagerState,
    state => state.loadingDevices
  ),

  loadingRooms: createSelector(
    selectDevicesManagerState,
    state => state.loadingRooms
  ),
};
