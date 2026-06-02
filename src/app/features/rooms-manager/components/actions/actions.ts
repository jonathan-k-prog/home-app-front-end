import {Component, Input, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {Store} from '@ngrx/store';
import {Room} from '../../../../core/room/room.model';
import {RoomsManagerActions} from '../../store/rooms-manager.actions';
import {CommonModalAddRoomComponent} from '../../../common/modal/add/room/room';


@Component({
  selector: 'rooms-manager-actions',
  imports: [
    Button,
    CommonModalAddRoomComponent,
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  @ViewChild(CommonModalAddRoomComponent) commonModalAddRoom!: CommonModalAddRoomComponent;

  constructor(
    private store: Store,
  ) {}

  protected add(){
    this.commonModalAddRoom.showModal()
  }

  protected addSubmit(room: Room){
    this.store.dispatch(RoomsManagerActions.addRoom({ room }));
  }

  protected refresh() {
    this.store.dispatch(RoomsManagerActions.loadRooms());
  }
}
