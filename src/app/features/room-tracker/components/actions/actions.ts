import {Component, inject, input, Input, ViewChild} from '@angular/core';
import { Button } from 'primeng/button';
import {Room} from '../../../../core/room/room.model';
import {CommonModalSelectRoomComponent} from '../../../common/modal/select/room/room';
import {RoomTrackerStore} from '../../room-tracker.store';

@Component({
  selector: 'room-tracker-actions',
  imports: [
    Button,
    CommonModalSelectRoomComponent
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  selectedRoom = input<Room | null>(null)
  rooms = input<Room[]>([])
  loadingRooms = input<boolean>(false)

  @ViewChild(CommonModalSelectRoomComponent) commonModalSelectRoom!: CommonModalSelectRoomComponent;

  private roomTrackerStore = inject(RoomTrackerStore);

  protected select() {
    this.commonModalSelectRoom.showModal();
  }

  protected unselect() {
    this.roomTrackerStore.unselectRoom();
  }

  protected selectSubmit(room: Room) {
    this.roomTrackerStore.selectRoom(room);
  }

  protected refresh() {
    //this.roomTrackerStore.re(room);
  }
}
