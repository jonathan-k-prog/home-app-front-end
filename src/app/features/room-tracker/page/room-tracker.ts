import {Component, inject, OnInit} from '@angular/core';
import {Title} from '../components/title/title';
import {Actions} from '../components/actions/actions';
import {Properties} from '../components/properties/properties';
import {Container} from '../components/container/container';
import {AsyncPipe} from '@angular/common';
import {Toast} from 'primeng/toast';
import {RoomStore} from '../../../core/room/room.store';
import {HomeStore} from '../../../core/home/home.store';
import {RoomTrackerStore} from '../room-tracker.store';

@Component({
  selector: 'app-room-tracker',
  imports: [
    Title,
    Actions,
    Properties,
    Container,
    Toast
  ],
  templateUrl: './room-tracker.html',
  styleUrl: './room-tracker.css',
})
export class RoomTrackerPage implements OnInit {
  protected roomStore = inject(RoomStore);
  protected homeStore = inject(HomeStore);
  protected roomTrackerStore = inject(RoomTrackerStore);

  ngOnInit() {
    const currentHome = this.homeStore.current();

    if(currentHome){
      this.roomStore.loadRoomsByHomeId(currentHome.id)
    }
  }
  /* protected rooms$: Observable<Room[]> = new Observable<Room[]>();
  protected selectedRoom$: Observable<Room | null> = new Observable<Room | null>();
  protected devices$: Observable<Device[]> = new Observable<Device[]>();
  protected loadingRooms$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.rooms$ = this.store.select(RoomTrackerSelectors.rooms);
    this.selectedRoom$ = this.store.select(RoomTrackerSelectors.selectedRoom);
    this.devices$ = this.store.select(RoomTrackerSelectors.devices);

    this.loadingRooms$ = this.store.select(RoomTrackerSelectors.loadingRooms);

    this.store.dispatch(RoomTrackerActions.loadRooms());
  }*/
}
