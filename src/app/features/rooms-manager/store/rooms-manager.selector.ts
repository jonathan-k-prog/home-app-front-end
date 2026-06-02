import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomsManagerState } from './rooms-manager.state';

export const selectRoomsManagerState =
  createFeatureSelector<RoomsManagerState>('roomsManager');

export const RoomsManagerSelectors = {
  rooms: createSelector(
    selectRoomsManagerState,
    state => state.rooms
  ),

  loadingRooms: createSelector(
    selectRoomsManagerState,
    state => state.loadingRooms
  ),
};
