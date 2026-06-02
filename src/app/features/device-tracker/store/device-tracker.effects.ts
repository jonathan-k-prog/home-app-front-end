import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DeviceApi} from '../../../core/device/device.api';
import {RoomApi} from '../../../core/room/room.api';
import {MessageService} from 'primeng/api';
import {DeviceTrackerActions} from './device-tracker.actions';

@Injectable()
export class DeviceTrackerEffects {
  private actions$ = inject(Actions);
  private deviceApi = inject(DeviceApi);
  private roomApi = inject(RoomApi);
  private messageService = inject(MessageService);

  refreshDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceTrackerActions.refreshDevice),
      switchMap((action) =>
        this.deviceApi.getById(action.device.id).pipe(
          map(({ data }) =>
            DeviceTrackerActions.refreshDeviceSuccess({ device: data })
          ),
          catchError(error =>
            of(
              DeviceTrackerActions.refreshDeviceFailure({
                error: error?.message ?? 'Device refreshing failed'
              })
            )
          )
        )
      )
    )
  );

  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceTrackerActions.loadDevices),
      switchMap(() =>
        this.deviceApi.getAll().pipe(
          map(({ data }) =>
            DeviceTrackerActions.loadDevicesSuccess({ devices: data })
          ),
          catchError(error =>
            of(
              DeviceTrackerActions.loadDevicesFailure({
                error: error?.message ?? 'Devices loading failed'
              })
            )
          )
        )
      )
    )
  );

  showRefreshDeviceToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          DeviceTrackerActions.refreshDeviceSuccess,
          DeviceTrackerActions.refreshDeviceFailure,
        ),
        tap(action => {
          if (action.type === DeviceTrackerActions.refreshDeviceSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Refresh Successful',
              detail: 'Device has been refreshed successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Refresh Failed',
              detail: (action as ReturnType<typeof DeviceTrackerActions.refreshDeviceFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showLoadDevicesToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          DeviceTrackerActions.loadDevicesSuccess,
          DeviceTrackerActions.loadDevicesFailure,
        ),
        tap(action => {
          if (action.type === DeviceTrackerActions.loadDevicesSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Devices have been loaded successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Load Failed',
              detail: (action as ReturnType<typeof DeviceTrackerActions.loadDevicesFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );
}
