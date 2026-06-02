import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Device} from '../../../core/device/device.model';

export const DeviceTrackerActions = createActionGroup({
  source: 'Device Tracker',
  events: {
    'Select Device': props<{ device: Device }>(),
    'Unselect Device': emptyProps(),

    'Refresh Device': props<{ device: Device }>(),
    'Refresh Device Success': props<{ device: Device }>(),
    'Refresh Device Failure': props<{ error: string }>(),

    'Load Devices': emptyProps(),
    'Load Devices Success': props<{ devices: Device[] }>(),
    'Load Devices Failure': props<{ error: string }>(),

    Reset: emptyProps(),
  },
});
