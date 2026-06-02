import { createFeatureSelector } from '@ngrx/store';
import { RoomTrackerState } from './room-tracker.state';

export const selectRoomTrackerState =
  createFeatureSelector<RoomTrackerState>('roomTracker');

export const RoomTrackerSelectors = {
};
