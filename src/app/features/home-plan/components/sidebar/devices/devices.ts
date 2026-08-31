import {Component, computed, input, model} from '@angular/core';
import {Device} from '../../../../../core/device/device.model';
import {Panel} from 'primeng/panel';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Room} from '../../../../../core/room/room.model';

@Component({
  selector: 'home-plan-sidebar-devices',
  imports: [
    Panel,
    ReactiveFormsModule
  ],
  templateUrl: './devices.html',
  styleUrl: './devices.css',
})
export class Devices {
  selectedRoom = input<Room | null>(null);
  devices = input<Device[]>([]);

  protected form!: FormGroup;
  protected collapsed: boolean = true;

  protected filterDevices = computed(() => {
    const result: Device[] = [];
    const selectedRoom = this.selectedRoom();

   if (selectedRoom) {
     return this.devices().filter(d => d.room.id === selectedRoom.id);

   }
    return result;
  });
}
