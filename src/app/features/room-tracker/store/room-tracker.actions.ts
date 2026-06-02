import { createActionGroup, emptyProps } from '@ngrx/store';

export const RoomTrackerActions = createActionGroup({
  source: 'Room Tracker',
  events: {
    'Reset': emptyProps(),
  }
});
