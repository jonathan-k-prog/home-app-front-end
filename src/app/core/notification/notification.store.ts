import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import {NotificationApi} from './notification.api';
import {Notification} from './notification.model';
import {NotificationMqttService} from './notification.mqtt';
import {apiRxMethod} from '../store/api-rx-method';

interface NotificationState {
  notifications: Notification[];
  loadingNotifications: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loadingNotifications: false,
  error: null
};

export const NotificationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    notificationApi = inject(NotificationApi),
    notificationMqttService = inject(NotificationMqttService),
    messageService = inject(MessageService)) => ({

    connect: rxMethod<void>(pipe(
      tap(() => patchState(store, { loadingNotifications: true, error: null })),
      switchMap(() => notificationMqttService.listen().pipe(
        tap((notification) => {
          patchState(store, {
            notifications: [...store.notifications().filter(n => n.id !== notification.id),
              notification],
            loadingNotifications: false,
          });
          messageService.add({ severity: 'success', summary: 'New notification', detail:
              'Notifications have been updated successfully.' });
        }),
        catchError(error => {
          const message = error?.message ?? 'New notification updating failed';
          patchState(store, { loadingNotifications: false, error: message });
          messageService.add({ severity: 'error', summary: 'New notification', detail:
            message });
          return of(null);
        }),
      )),
    )),

    loadNotifications: apiRxMethod<void, Notification[], NotificationState>(
      store, messageService,
      () => notificationApi.getAll(),
      (loadingNotifications, error) => ({ loadingNotifications, error }),
      (notifications) => ({ notifications }),
      {
        successSummary: 'Load Successful', successDetail: 'Notifications have been loaded successfully.',
        errorSummary: 'Load Failed', fallbackError: 'Notifications loading failed'
      },
    ),

    updateNotification: apiRxMethod<Notification, Notification, NotificationState>(
      store, messageService,
      (notification) => notificationApi.update(notification.id, notification),
      (loadingNotifications, error) => ({ loadingNotifications, error }),
      (notification) => ({ notifications: [...store.notifications().filter(n => n.id !== notification.id), notification] }),
      {
        successSummary: 'Update Successful', successDetail: 'Notification has been updated successfully.',
        errorSummary: 'Update Failed', fallbackError: 'Notification updating failed'
      },
    ),

    deleteNotification: apiRxMethod<Notification, Notification, NotificationState>(
      store, messageService,
      (notification) => notificationApi.delete(notification.id),
      (loadingNotifications, error) => ({ loadingNotifications, error }),
      (notification) => ({ notifications: [...store.notifications().filter(n => n.id !== notification.id)] }),
      {
        successSummary: 'Delete Successful', successDetail: 'Notification has been deleted successfully.',
        errorSummary: 'Delete Failed', fallbackError: 'Notification deleting failed'
      },
    ),

    reset() { patchState(store, initialState); },
  })),
);
