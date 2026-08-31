import {Component, computed, input, model, output} from '@angular/core';
import {Card} from 'primeng/card';
import {Room} from '../../../../core/room/room.model';
import {ReactiveFormsModule} from '@angular/forms';
import {Device} from '../../../../core/device/device.model';

@Component({
  selector: 'home-plan-display',
  imports: [
    Card,
    ReactiveFormsModule,
  ],
  templateUrl: './display.html',
  styleUrl: './display.css',
})
export class Display {
  rooms = input<Room[]>([]);
  devices = input<Device[]>([]);
  selectedRoom = model<Room | null>(null);
  floor = input<number>(0);
  zoom = input<number>(10);


  protected roomsOnFloor = computed(() =>
    this.rooms().filter(room => room.floor === this.floor())
  );

  protected devicesByRoom = computed(() => {
    const map = new Map<number, number>();
    for (const device of this.devices()) {
      map.set(device.room.id, (map.get(device.room.id) ?? 0) + 1);
    }
    return map;
  });

  protected onSelectRoom(room: Room) {
    const current = this.selectedRoom();
    this.selectedRoom.set(current && current.id === room.id ? null : {...room});
  }
}
