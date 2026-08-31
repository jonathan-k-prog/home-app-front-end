import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Notification } from '../../../core/notification/notification.model';

export const NotificationsActions = createActionGroup({
  source: 'Notifications',
  events: {
    'Connect': emptyProps(),
    'Add Notification': props<{ notification: Notification }>(),
    'Dismiss': props<{ id: number }>(),
    'Mark All As Read': emptyProps(),
    'Connection Error': props<{ error: string }>(),

  },
});
