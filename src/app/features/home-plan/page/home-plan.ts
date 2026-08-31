import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Toast} from 'primeng/toast';
import {Title} from '../components/title/title';
import {Actions} from '../components/actions/actions';
import {Display} from '../components/display/display';
import {Sidebar} from '../components/sidebar/sidebar';
import {RoomStore} from '../../../core/room/room.store';
import {HomeStore} from '../../../core/home/home.store';
import {Room} from '../../../core/room/room.model';
import {DeviceStore} from '../../../core/device/device.store';
import {Device} from '../../../core/device/device.model';

@Component({
  selector: 'app-home-plan',
  imports: [
    Title,
    Toast,
    Title,
    Actions,
    Display,
    Sidebar,
  ],
  templateUrl: './home-plan.html',
  styleUrl: './home-plan.css',
})
export class HomePlanPage implements OnInit {
  protected selectedRoom = signal<Room | null>(null);
  protected floor = signal<number>(0)
  protected zoom = signal<number>(10);

  protected homeStore = inject(HomeStore);
  protected roomStore = inject(RoomStore);
  protected deviceStore = inject(DeviceStore);

  ngOnInit() {
    const currentHome = this.homeStore.current();

    if(currentHome){
      this.roomStore.loadRoomsByHomeId(currentHome.id);
      this.deviceStore.loadDevicesByHomeId(currentHome.id);
    }
  }
}
