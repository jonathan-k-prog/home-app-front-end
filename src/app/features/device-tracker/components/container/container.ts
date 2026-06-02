import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Chart} from './chart/chart';
import {Device} from '../../../../core/device/device.model';
import {Store} from '@ngrx/store';
import {DeviceTrackerActions} from '../../store/device-tracker.actions';
import {DateFormatter} from '../../../../core/date/date.formatter';
import {Card} from 'primeng/card';

@Component({
  selector: 'device-tracker-container',
  imports: [Chart, Card],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container implements OnInit, OnDestroy {
  @Input() selectedDevice: Device | null = null;

  private intervalId: any;

  constructor(
    private store: Store,
    protected dateFormatter: DateFormatter,
  ) {}

  ngOnInit() {
    this.intervalId = setInterval(() => {
      console.log()
      if (this.selectedDevice) {
        this.store.dispatch(
          DeviceTrackerActions.refreshDevice({ device: this.selectedDevice! })
        );
      }
    }, 5000); // 5000 ms = 5 secondes
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
