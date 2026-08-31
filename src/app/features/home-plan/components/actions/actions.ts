import {Component, inject, input, model, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {Room, RoomRequest} from '../../../../core/room/room.model';
import {Device} from '../../../../core/device/device.model';
import {Home} from '../../../../core/home/home.model';
import {CommonModalAddRoomComponent} from '../../../common/modal/add/room/room';
import {RoomStore} from '../../../../core/room/room.store';


@Component({
  selector: 'home-plan-actions',
  imports: [
    Button,
    CommonModalAddRoomComponent
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  rooms = input<Room[]>([]);
  floor = model<number>(0);
  zoom = model<number>(10);
  home = input<Home | null>(null);

  @ViewChild(CommonModalAddRoomComponent) commonModalAddRoom!: CommonModalAddRoomComponent;

  private roomStore = inject(RoomStore);

  protected addRoom(){
    const home = this.home();

    if(home){
      this.commonModalAddRoom.showModal(home)
    }
  }

  protected addRoomSubmit(room: RoomRequest){
    this.roomStore.addRoom(room);
  }

  protected nextFloor() {
    if (this.isNextFloorPossible()) {
      this.floor.update(floor => floor + 1);
    }
  }

  protected isNextFloorPossible() {
    const floors = this.rooms().map(room => room.floor);
    const max = floors.length ? Math.max(...floors) : 0;

    return this.floor() + 1 <= max;
  }

  protected previousFloor() {
    if (this.isPreviousFloorPossible()) {
      this.floor.update(floor => floor - 1);
    }
  }

  protected isPreviousFloorPossible() {
    const floors = this.rooms().map(room => room.floor);
    const min = floors.length ? Math.min(...floors) : 0;

    return this.floor() - 1 >= min;
  }

  protected zoomIn() {
    if(this.zoom() + 1 <= 15){
      this.zoom.set(this.zoom() + 1)
    }
  }

  protected zoomOut() {
    if(this.zoom() - 1 >= 5){
      this.zoom.set(this.zoom() - 1)
    }
  }
}
