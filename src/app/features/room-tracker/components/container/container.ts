import {Component, inject, input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription, interval} from 'rxjs';
import {Card} from 'primeng/card';
import {Room} from '../../../../core/room/room.model';
import {Device} from '../../../../core/device/device.model';
import {DeviceViewer} from './device-viewer/device-viewer';
import {RoomTrackerStore} from '../../room-tracker.store';

const REFRESH_INTERVAL_MS = 5000;

@Component({
  selector: 'room-tracker-container',
  imports: [Card, DeviceViewer],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container implements OnInit, OnChanges, OnDestroy {
  selectedRoom = input<Room | null>(null)
  devices = input<Device[]>([])

  private refreshSubscription: Subscription | null = null;

  private roomTrackerStore = inject(RoomTrackerStore);

  ngOnInit() {
    this.refreshSubscription = interval(REFRESH_INTERVAL_MS).subscribe(() => this.refreshDevices());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedRoom'] && this.selectedRoom()) {
      this.refreshDevices();
    }
  }

  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }

  private refreshDevices() {
    const selectedRoom = this.selectedRoom();

    if (!selectedRoom) {
      return;
    }

    this.roomTrackerStore.refreshRoom(selectedRoom.id);
    this.roomTrackerStore.refreshDevices(selectedRoom.id);
  }
}
