import {Component, inject, input, Input, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {RoomRequest} from '../../../../core/room/room.model';
import {CommonModalAddRoomComponent} from '../../../common/modal/add/room/room';
import {Home} from '../../../../core/home/home.model';
import {RoomStore} from '../../../../core/room/room.store';


@Component({
  selector: 'rooms-manager-actions',
  imports: [
    Button,
    CommonModalAddRoomComponent,
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class RoomsManagerActionsComponent {
  public home = input<Home | null>(null);

  @ViewChild(CommonModalAddRoomComponent) commonModalAddRoom!: CommonModalAddRoomComponent;

  private roomStore = inject(RoomStore);

  protected add(){
    const home = this.home();

    if(home){
      this.commonModalAddRoom.showModal(home)
    }
  }

  protected addSubmit(room: RoomRequest){
    this.roomStore.addRoom(room);
  }

  protected refresh() {
    const home = this.home();

    if(home) {
      this.roomStore.loadRoomsByHomeId(home.id);
    }
  }
}
