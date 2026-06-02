import { Component } from '@angular/core';
import {Title} from '../components/title/title';
import {Actions} from '../components/actions/actions';
import {Toast} from 'primeng/toast';
import {Properties} from '../components/properties/properties';
import {Container} from '../components/container/container';
import {Observable} from 'rxjs';
import {Device} from '../../../core/device/device.model';
import {Store} from '@ngrx/store';
import {DeviceTrackerSelectors} from '../store/device-tracker.selector';
import {DeviceTrackerActions} from '../store/device-tracker.actions';
import {AsyncPipe} from '@angular/common';

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
    AsyncPipe
  ],
})
export class DeviceTrackerPage {
  protected devices$: Observable<Device[]> = new Observable<Device[]>();
  protected selectedDevice$: Observable<Device | null> = new Observable<Device | null>();
  protected loadingDevices$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.devices$ = this.store.select(DeviceTrackerSelectors.devices);
    this.selectedDevice$ = this.store.select(DeviceTrackerSelectors.selectedDevice);
    this.loadingDevices$ = this.store.select(DeviceTrackerSelectors.loadingDevices);

    this.store.dispatch(DeviceTrackerActions.loadDevices());
  }
}
