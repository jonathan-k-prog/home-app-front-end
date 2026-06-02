import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Room} from '../../../../../core/room/room.model';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'common-modal-delete-room',
  imports: [
    Dialog,
    Button
  ],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class CommonModalDeleteRoomComponent {
  @Input() room: Room | null = null;
  @Output() onSubmit: EventEmitter<Room> = new EventEmitter();

  protected visible: boolean = false;

  public showModal(room: Room) {
    this.room = room;
    this.visible = true;
  }

  protected confirm() {
    if (!this.room) {
      return;
    }

    this.onSubmit.emit(this.room);
    this.cancel();
  }

  protected cancel() {
    this.room = null;
    this.visible = false;
  }
}
