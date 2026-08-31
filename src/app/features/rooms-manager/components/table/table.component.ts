import {Component, inject, input, Input, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {Skeleton} from 'primeng/skeleton';
import {Room} from '../../../../core/room/room.model';
import {CommonModalUpdateRoomComponent} from '../../../common/modal/update/room/room';
import {CommonModalDeleteRoomComponent} from '../../../common/modal/delete/room/room';
import {Router} from '@angular/router';
import {RoomStore} from '../../../../core/room/room.store';
import {Home} from '../../../../core/home/home.model';

@Component({
  selector: 'rooms-manager-table',
  imports: [
    TableModule,
    Button,
    Skeleton,
    CommonModalUpdateRoomComponent,
    CommonModalDeleteRoomComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class RoomsManagerTableComponent {
  public rooms = input<Room[]>([]);
  public loadingRooms = input<boolean>(false);

  @ViewChild(CommonModalUpdateRoomComponent) commonModalUpdateRoom!: CommonModalUpdateRoomComponent;
  @ViewChild(CommonModalDeleteRoomComponent) commonModalDeleteRoom!: CommonModalDeleteRoomComponent;

  private roomStore = inject(RoomStore);
  private router = inject(Router);

  protected track(room: Room) {

    //this.store.dispatch(RoomTrackerActions.reset());
    //this.store.dispatch(RoomTrackerActions.selectRoom({ room }));
    this.router.navigate(['/room-tracker']);
  }

  protected update(room: Room) {
    this.commonModalUpdateRoom.showModal(room);
  }

  protected updateSubmit(room: Room) {
    this.roomStore.updateRoom(room);
  }

  protected delete(room: Room) {
    this.commonModalDeleteRoom.showModal(room);
  }

  protected deleteSubmit(room: Room) {
    this.roomStore.deleteRoom(room);
  }
}
