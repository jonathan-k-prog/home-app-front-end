import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {Button} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {PrimeTemplate} from "primeng/api";
import {Skeleton} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {Room} from '../../../../../core/room/room.model';

@Component({
  selector: 'common-modal-select-room',
    imports: [
        Button,
        Dialog,
        PrimeTemplate,
        Skeleton,
        TableModule
    ],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class CommonModalSelectRoomComponent {
  public rooms = input<Room[]>([]);
  public loadingRooms = input<boolean>(false);

  @Output() onSubmit: EventEmitter<Room> = new EventEmitter();

  protected visible: boolean = false;

  public showModal() {
    this.visible = true;
  }

  protected select(room: Room) {
    this.onSubmit.emit(room);
    this.visible = false;
  }

  protected cancel() {
    this.visible = false;
  }
}
