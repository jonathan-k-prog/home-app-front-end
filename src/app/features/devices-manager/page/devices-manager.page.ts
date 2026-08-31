import {Component, inject, OnInit} from '@angular/core';
import {Toast} from "primeng/toast";
import {DevicesManagerTableComponent} from '../components/table/table.component';
import {DevicesManagerTitleComponent} from '../components/title/title.component';
import {DevicesManagerActionsComponent} from '../components/actions/actions.component';
import {HomeStore} from '../../../core/home/home.store';
import {DeviceStore} from '../../../core/device/device.store';
import {RoomStore} from '../../../core/room/room.store';

@Component({
    selector: 'app-devices-manager',
    templateUrl: './devices-manager.page.html',
    styleUrl: './devices-manager.page.css',
  imports: [
    Toast,
    DevicesManagerTableComponent,
    DevicesManagerTitleComponent,
    DevicesManagerActionsComponent
  ]
})
export class DevicesManagerPage implements OnInit {
  protected deviceStore = inject(DeviceStore);
  protected roomStore = inject(RoomStore);
  protected homeStore = inject(HomeStore);

  ngOnInit() {
    const currentHome = this.homeStore.current();

    if(currentHome){
      this.deviceStore.loadDevicesByHomeId(currentHome.id)
      this.roomStore.loadRoomsByHomeId(currentHome.id)
    }
  }
}
