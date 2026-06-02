import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {RoomsManagerActions} from './rooms-manager.actions';
import {RoomApi} from '../../../core/room/room.api';
import {of} from 'rxjs';

@Injectable()
export class RoomsManagerEffects {
  private actions$ = inject(Actions);
  private roomApi = inject(RoomApi);
  private messageService = inject(MessageService);

  addRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomsManagerActions.addRoom),
      switchMap((action) =>
        this.roomApi.add(action.room).pipe(
          map(({ data }) =>
            RoomsManagerActions.addRoomSuccess({ room: data })
          ),
          catchError(error =>
            of(
              RoomsManagerActions.addRoomFailure({
                error: error?.message ?? 'Room adding failed'
              })
            )
          )
        )
      )
    )
  );

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomsManagerActions.loadRooms),
      switchMap(() =>
        this.roomApi.getAll().pipe(
          map(({ data }) =>
            RoomsManagerActions.loadRoomsSuccess({ rooms: data })
          ),
          catchError(error =>
            of(
              RoomsManagerActions.loadRoomsFailure({
                error: error?.message ?? 'Rooms loading failed'
              })
            )
          )
        )
      )
    )
  );

  updateRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomsManagerActions.updateRoom),
      switchMap((action) =>
        this.roomApi.update(action.room.id, action.room).pipe(
          map(({ data }) =>
            RoomsManagerActions.updateRoomSuccess({ room: data })
          ),
          catchError(error =>
            of(
              RoomsManagerActions.updateRoomFailure({
                error: error?.message ?? 'Room updating failed'
              })
            )
          )
        )
      )
    )
  );

  deleteRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomsManagerActions.deleteRoom),
      switchMap((action) =>
        this.roomApi.delete(action.room.id).pipe(
          map(({ data }) =>
            RoomsManagerActions.deleteRoomSuccess({ room: data })
          ),
          catchError(error =>
            of(
              RoomsManagerActions.deleteRoomFailure({
                error: error?.message ?? 'Room deleting failed'
              })
            )
          )
        )
      )
    )
  );

  /*---------------- Toast ----------------*/
  showAddRoomToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          RoomsManagerActions.addRoomSuccess,
          RoomsManagerActions.addRoomFailure,
        ),
        tap(action => {
          if (action.type === RoomsManagerActions.addRoomSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Room has been added successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Add Failed',
              detail: (action as ReturnType<typeof RoomsManagerActions.addRoomFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showLoadRoomsToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          RoomsManagerActions.loadRoomsSuccess,
          RoomsManagerActions.loadRoomsFailure,
        ),
        tap(action => {
          if (action.type === RoomsManagerActions.loadRoomsSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Rooms have been loaded successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Load Failed',
              detail: (action as ReturnType<typeof RoomsManagerActions.loadRoomsFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showUpdateRoomsToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          RoomsManagerActions.updateRoomSuccess,
          RoomsManagerActions.updateRoomFailure,
        ),
        tap(action => {
          if (action.type === RoomsManagerActions.updateRoomSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Update Successful',
              detail: 'Room has been updated successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: (action as ReturnType<typeof RoomsManagerActions.updateRoomFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showDeleteRoomsToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          RoomsManagerActions.deleteRoomSuccess,
          RoomsManagerActions.deleteRoomFailure,
        ),
        tap(action => {
          if (action.type === RoomsManagerActions.deleteRoomSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete Successful',
              detail: 'Room has been deleted successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Failed',
              detail: (action as ReturnType<typeof RoomsManagerActions.deleteRoomFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );
}
