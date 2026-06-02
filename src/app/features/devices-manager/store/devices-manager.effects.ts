import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MessageService} from 'primeng/api';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {DeviceApi} from '../../../core/device/device.api';
import {DevicesManagerActions} from './devices-manager.actions';
import {RoomApi} from '../../../core/room/room.api';

@Injectable()
export class DevicesManagerEffects {
  private actions$ = inject(Actions);
  private deviceApi = inject(DeviceApi);
  private roomApi = inject(RoomApi);
  private messageService = inject(MessageService);

  addDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DevicesManagerActions.addDevice),
      switchMap((action) =>
        this.deviceApi.add({
          name: action.device.name,
          type: action.device.type,
          roomId: action.device.room.id
        }).pipe(
          map(({ data }) =>
            DevicesManagerActions.addDeviceSuccess({ device: data })
          ),
          catchError(error =>
            of(
              DevicesManagerActions.addDeviceFailure({
                error: error?.message ?? 'Device adding failed'
              })
            )
          )
        )
      )
    )
  );

  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DevicesManagerActions.loadDevices),
      switchMap(() =>
        this.deviceApi.getAll().pipe(
          map(({ data }) =>
            DevicesManagerActions.loadDevicesSuccess({ devices: data })
          ),
          catchError(error =>
            of(
              DevicesManagerActions.loadDevicesFailure({
                error: error?.message ?? 'Devices loading failed'
              })
            )
          )
        )
      )
    )
  );

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DevicesManagerActions.loadRooms),
      switchMap(() =>
        this.roomApi.getAll().pipe(
          map(({ data }) =>
            DevicesManagerActions.loadRoomsSuccess({ rooms: data })
          ),
          catchError(error =>
            of(
              DevicesManagerActions.loadRoomsFailure({
                error: error?.message ?? 'Rooms loading failed'
              })
            )
          )
        )
      )
    )
  );

  updateDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DevicesManagerActions.updateDevice),
      switchMap((action) =>
        this.deviceApi.update(action.device.id, {
          name: action.device.name,
          type: action.device.type,
          roomId: action.device.room.id
        }).pipe(
          map(({ data }) =>
            DevicesManagerActions.updateDeviceSuccess({ device: data })
          ),
          catchError(error =>
            of(
              DevicesManagerActions.updateDeviceFailure({
                error: error?.message ?? 'Device updating failed'
              })
            )
          )
        )
      )
    )
  );

  deleteDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DevicesManagerActions.deleteDevice),
      switchMap((action) =>
        this.deviceApi.delete(action.device.id).pipe(
          map(({ data }) =>
            DevicesManagerActions.deleteDeviceSuccess({ device: data })
          ),
          catchError(error =>
            of(
              DevicesManagerActions.deleteDeviceFailure({
                error: error?.message ?? 'Device deleting failed'
              })
            )
          )
        )
      )
    )
  );

  /*---------------- Toast ----------------*/
  showAddDeviceToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          DevicesManagerActions.addDeviceSuccess,
          DevicesManagerActions.addDeviceFailure,
        ),
        tap(action => {
          if (action.type === DevicesManagerActions.addDeviceSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Device has been added successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Add Failed',
              detail: (action as ReturnType<typeof DevicesManagerActions.addDeviceFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showLoadDevicesToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          DevicesManagerActions.loadDevicesSuccess,
          DevicesManagerActions.loadDevicesFailure,
        ),
        tap(action => {
          if (action.type === DevicesManagerActions.loadDevicesSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Devices have been loaded successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Load Failed',
              detail: (action as ReturnType<typeof DevicesManagerActions.loadDevicesFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showLoadRoomsToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          DevicesManagerActions.loadRoomsSuccess,
          DevicesManagerActions.loadRoomsFailure,
        ),
        tap(action => {
          if (action.type === DevicesManagerActions.loadRoomsSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Rooms have been loaded successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Load Failed',
              detail: (action as ReturnType<typeof DevicesManagerActions.loadRoomsFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showUpdateDevicesToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          DevicesManagerActions.updateDeviceSuccess,
          DevicesManagerActions.updateDeviceFailure,
        ),
        tap(action => {
          if (action.type === DevicesManagerActions.updateDeviceSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Update Successful',
              detail: 'Device has been updated successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: (action as ReturnType<typeof DevicesManagerActions.updateDeviceFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showDeleteDevicesToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          DevicesManagerActions.deleteDeviceSuccess,
          DevicesManagerActions.deleteDeviceFailure,
        ),
        tap(action => {
          if (action.type === DevicesManagerActions.deleteDeviceSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete Successful',
              detail: 'Device has been deleted successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Failed',
              detail: (action as ReturnType<typeof DevicesManagerActions.deleteDeviceFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );
}
