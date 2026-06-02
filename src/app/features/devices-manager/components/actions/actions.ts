import {Component, Input, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {Store} from '@ngrx/store';
import {DevicesManagerActions} from '../../store/devices-manager.actions';
import {Device} from '../../../../core/device/device.model';
import {Room} from '../../../../core/room/room.model';
import {CommonModalAddDeviceComponent} from '../../../common/modal/add/device/device';


@Component({
  selector: 'devices-manager-actions',
  imports: [
    Button,
    CommonModalAddDeviceComponent,
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  @Input() rooms: Room[] = [];
  @Input() loadingRooms: boolean = false;

  @ViewChild(CommonModalAddDeviceComponent) commonModalAddDevice!: CommonModalAddDeviceComponent;

  constructor(
    private store: Store,
  ) {}

  protected add(){
    this.commonModalAddDevice.showModal()
  }

  protected addSubmit(device: Device){
    console.log(device);

    this.store.dispatch(DevicesManagerActions.addDevice({ device }));
  }

  protected refresh() {
    this.store.dispatch(DevicesManagerActions.loadDevices());
    this.store.dispatch(DevicesManagerActions.loadRooms());
  }
}
