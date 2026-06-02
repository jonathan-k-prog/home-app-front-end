import { createReducer, on } from '@ngrx/store';
import { initialRoomTrackerState } from './room-tracker.state';
import { RoomTrackerActions } from './room-tracker.actions';

export const RoomTrackerReducer = createReducer(
  initialRoomTrackerState,

  on(RoomTrackerActions.reset, (state) => ({
    ...state
  }))
);
