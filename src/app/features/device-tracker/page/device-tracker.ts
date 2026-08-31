import {Component, inject} from '@angular/core';
import {Title} from '../components/title/title';
import {Actions} from '../components/actions/actions';
import {Toast} from 'primeng/toast';
import {Properties} from '../components/properties/properties';
import {Container} from '../components/container/container';
import {DeviceStore} from '../../../core/device/device.store';
import {RoomStore} from '../../../core/room/room.store';
import {HomeStore} from '../../../core/home/home.store';
import {DeviceTrackerStore} from '../device-tracker.store';

@Component({
  selector: 'app-device-tracker',
  templateUrl: './device-tracker.html',
  styleUrl: './device-tracker.css',
  imports: [
    Title,
    Actions,
    Toast,
    Properties,
    Container,
  ],
})
export class DeviceTrackerPage {

  protected deviceStore = inject(DeviceStore);
  protected roomStore = inject(RoomStore);
  protected homeStore = inject(HomeStore);
  protected deviceTrackerStore = inject(DeviceTrackerStore);

  ngOnInit() {
    const currentHome = this.homeStore.current();

    if(currentHome){
      this.deviceStore.loadDevicesByHomeId(currentHome.id)
    }
  }
}
