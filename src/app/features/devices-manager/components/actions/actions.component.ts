import {Component, inject, input, Input, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {DeviceRequest} from '../../../../core/device/device.model';
import {Room} from '../../../../core/room/room.model';
import {CommonModalAddDeviceComponent} from '../../../common/modal/add/device/device';
import {Home} from '../../../../core/home/home.model';
import {DeviceStore} from '../../../../core/device/device.store';
import {RoomStore} from '../../../../core/room/room.store';

@Component({
  selector: 'devices-manager-actions',
  imports: [
    Button,
    CommonModalAddDeviceComponent,
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class DevicesManagerActionsComponent {
  rooms = input<Room[]>([]);
  loadingRooms = input<boolean>(false);
  home = input<Home | null>(null);

  @ViewChild(CommonModalAddDeviceComponent) commonModalAddDevice!: CommonModalAddDeviceComponent;

  private deviceStore = inject(DeviceStore);
  private roomStore = inject(RoomStore);

  protected add(){
    this.commonModalAddDevice.showModal()
  }

  protected addSubmit(device: DeviceRequest){
    this.deviceStore.addDevice(device)
  }

  protected refresh() {
    const home = this.home();

    if(home){
      this.deviceStore.loadDevicesByHomeId(home.id)
      this.roomStore.loadRoomsByHomeId(home.id)
    }
  }
}
