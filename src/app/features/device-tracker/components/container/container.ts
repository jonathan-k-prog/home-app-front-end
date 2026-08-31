import {Component, OnDestroy, OnInit, inject, input} from '@angular/core';
import {Device} from '../../../../core/device/device.model';
import {Card} from 'primeng/card';
import {DeviceTrackerStore} from '../../device-tracker.store';

@Component({
  selector: 'device-tracker-container',
  imports: [Card],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container implements OnInit, OnDestroy {
  selectedDevice = input<Device | null>(null);

  private intervalId: any;

  protected deviceTrackerStore = inject(DeviceTrackerStore);

  ngOnInit() {
    this.intervalId = setInterval(() => {
      const selectedDevice = this.selectedDevice();
      if (selectedDevice) {
        this.deviceTrackerStore.refreshDevice(selectedDevice.id);
      }
    }, 5000); // 5000 ms = 5 secondes
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
