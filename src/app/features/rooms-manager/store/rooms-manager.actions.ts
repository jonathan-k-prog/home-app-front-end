import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Room} from '../../../core/room/room.model';

export const RoomsManagerActions = createActionGroup({
  source: 'Rooms Manager',
  events: {
    'Add Room': props<{ room: Room }>(),
    'Add Room Success': props<{ room: Room }>(),
    'Add Room Failure': props<{ error: string }>(),

    'Load Rooms': emptyProps(),
    'Load Rooms Success': props<{ rooms: Room[] }>(),
    'Load Rooms Failure': props<{ error: string }>(),

    'Update Room': props<{ room: Room }>(),
    'Update Room Success': props<{ room: Room }>(),
    'Update Room Failure': props<{ error: string }>(),

    'Delete Room': props<{ room: Room }>(),
    'Delete Room Success': props<{ room: Room }>(),
    'Delete Room Failure': props<{ error: string }>(),

    Reset: emptyProps(),
  },
});
