import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Room} from '../../../core/room/room.model';
import {Device} from '../../../core/device/device.model';

export const DevicesManagerActions = createActionGroup({
  source: 'Devices Manager',
  events: {
    'Add Device': props<{ device: Device }>(),
    'Add Device Success': props<{ device: Device }>(),
    'Add Device Failure': props<{ error: string }>(),

    'Load Devices': emptyProps(),
    'Load Devices Success': props<{ devices: Device[] }>(),
    'Load Devices Failure': props<{ error: string }>(),

    'Load Rooms': emptyProps(),
    'Load Rooms Success': props<{ rooms: Room[] }>(),
    'Load Rooms Failure': props<{ error: string }>(),

    'Update Device': props<{ device: Device }>(),
    'Update Device Success': props<{ device: Device }>(),
    'Update Device Failure': props<{ error: string }>(),

    'Delete Device': props<{ device: Device }>(),
    'Delete Device Success': props<{ device: Device }>(),
    'Delete Device Failure': props<{ error: string }>(),

    Reset: emptyProps(),
  },
});
