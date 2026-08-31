import {
  Component,
  inject, input,
  model,
} from '@angular/core';
import {Card} from 'primeng/card';
import {Room} from '../../../../core/room/room.model';
import {Button} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {RoomStore} from '../../../../core/room/room.store';
import {Positions} from './positions/positions';
import {Dimensions} from './dimensions/dimensions';
import {Device} from '../../../../core/device/device.model';
import {Devices} from './devices/devices';
import {Properties} from './properties/properties';

@Component({
  selector: 'home-plan-sidebar',
  imports: [
    Card,
    Button,
    ReactiveFormsModule,
    Positions,
    Dimensions,
    Devices,
    Properties,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  selectedRoom = model<Room | null>(null);
  devices = input<Device[]>([]);

  private roomStore = inject(RoomStore);

  protected moveUp(): void {
    const room = this.selectedRoom();
    if (!room) return;
    this.selectedRoom.set({...room, y: Math.max(0, room.y - 10)});
  }

  protected moveDown(): void {
    const room = this.selectedRoom();
    if (!room) return;
    this.selectedRoom.set({...room, y: room.y + 10});
  }

  protected moveLeft(): void {
    const room = this.selectedRoom();
    if (!room) return;
    this.selectedRoom.set({...room, x: Math.max(0, room.x - 10)});
  }

  protected moveRight(): void {
    const room = this.selectedRoom();
    if (!room) return;
    this.selectedRoom.set({...room, x: room.x + 10});
  }

  protected save(): void {
    const room = this.selectedRoom();
    if (room) {
      this.roomStore.updateRoom(room);
    }
  }

  protected cancel(): void {
    this.selectedRoom.set(null);
  }
}
