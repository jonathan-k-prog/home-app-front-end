import {Component, input} from '@angular/core';
import {Room} from '../../../../core/room/room.model';

@Component({
  selector: 'room-tracker-properties',
  imports: [],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties {
  selectedRoom = input<Room | null>(null)
}
