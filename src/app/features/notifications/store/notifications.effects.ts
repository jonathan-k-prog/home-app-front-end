import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationsActions } from './notifications.actions';
import { NotificationMqttService } from '../../../core/notification/notification.mqtt';
import {NotificationApi} from '../../../core/notification/notification.api';

@Injectable()
export class NotificationsEffects {
  private actions$ = inject(Actions);
  private notificationMqttService = inject(NotificationMqttService);
  private notificationApi = inject(NotificationApi);

  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.connect),
      switchMap(() =>
        this.notificationMqttService.listen().pipe(
          map(notification => NotificationsActions.addNotification({ notification })),
          catchError(error =>
            of(NotificationsActions.connectionError({
              error: error?.message ?? 'MQTT connection failed'
            }))
          )
        )
      )
    )
  );

 /* loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.loadNotifications),
      switchMap(() =>
        this.notificationApi.getAll().pipe(
          map(({ data }) =>
            NotificationsActions.loadNotificationsSuccess({ notifications: data })
          ),
          catchError(error =>
            of(
              NotificationsActions.loadNotificationsFailure({
                error: error?.message ?? 'Notifications loading failed'
              })
            )
          )
        )
      )
    )
  );

  updateNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.updateNotification),
      switchMap((action) =>
        this.notificationApi.update(action.notification.id, action.notification).pipe(
          map(({ data }) =>
            NotificationsActions.updateNotificationSuccess({ notification: data })
          ),
          catchError(error =>
            of(
              NotificationsActions.updateNotificationFailure({
                error: error?.message ?? 'Notification updating failed'
              })
            )
          )
        )
      )
    )
  );

  deleteNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationsActions.deleteNotification),
      switchMap((action) =>
        this.notificationApi.delete(action.notification.id).pipe(
          map(({ data }) =>
            NotificationsActions.deleteNotificationSuccess({ notification: data })
          ),
          catchError(error =>
            of(
              NotificationsActions.deleteNotificationFailure({
                error: error?.message ?? 'Notification deleting failed'
              })
            )
          )
        )
      )
    )
  );*/
}
