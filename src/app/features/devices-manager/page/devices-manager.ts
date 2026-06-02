import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Toast} from "primeng/toast";
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Device} from '../../../core/device/device.model';
import {DevicesManagerSelectors} from '../store/devices-manager.selector';
import {DevicesManagerActions} from '../store/devices-manager.actions';
import {Table} from '../components/table/table';
import {Title} from '../components/title/title';
import {Actions} from '../components/actions/actions';
import {Room} from '../../../core/room/room.model';

@Component({
    selector: 'app-devices-manager',
    templateUrl: './devices-manager.html',
    styleUrl: './devices-manager.css',
  imports: [
    AsyncPipe,
    Toast,
    Table,
    Title,
    Actions
  ]
})
export class DevicesManagerPage implements OnInit {
  protected devices$: Observable<Device[]> = new Observable<Device[]>();
  protected rooms$: Observable<Room[]> = new Observable<Room[]>();
  protected loadingDevices$: Observable<boolean> = new Observable<boolean>();
  protected loadingRooms$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.devices$ = this.store.select(DevicesManagerSelectors.devices);
    this.rooms$ = this.store.select(DevicesManagerSelectors.rooms);
    this.loadingDevices$ = this.store.select(DevicesManagerSelectors.loadingDevices);
    this.loadingRooms$ = this.store.select(DevicesManagerSelectors.loadingRooms);

    this.store.dispatch(DevicesManagerActions.loadDevices());
    this.store.dispatch(DevicesManagerActions.loadRooms());
  }
}
