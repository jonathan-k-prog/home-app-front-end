import {Component, Input, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Skeleton} from 'primeng/skeleton';
import {Room} from '../../../../core/room/room.model';
import {CommonModalUpdateRoomComponent} from '../../../common/modal/update/room/room';
import {CommonModalDeleteRoomComponent} from '../../../common/modal/delete/room/room';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {RoomsManagerActions} from '../../store/rooms-manager.actions';

@Component({
  selector: 'rooms-manager-table',
  imports: [
    TableModule,
    Button,
    Skeleton,
    CommonModalUpdateRoomComponent,
    CommonModalDeleteRoomComponent
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() rooms: Room[] = [];
  @Input() loading: boolean = false;

  @ViewChild(CommonModalUpdateRoomComponent) commonModalUpdateRoom!: CommonModalUpdateRoomComponent;
  @ViewChild(CommonModalDeleteRoomComponent) commonModalDeleteRoom!: CommonModalDeleteRoomComponent;

  constructor(
    private store: Store
  ) {}

  protected update(room: Room) {
    this.commonModalUpdateRoom.showModal(room);
  }

  protected updateSubmit(room: Room) {
    this.store.dispatch(RoomsManagerActions.updateRoom({room}));
  }

  protected delete(room: Room) {
    this.commonModalDeleteRoom.showModal(room);
  }

  protected deleteSubmit(room: Room) {
    this.store.dispatch(RoomsManagerActions.deleteRoom({room}));
  }
}
