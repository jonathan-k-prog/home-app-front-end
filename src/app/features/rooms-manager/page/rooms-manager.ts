import {Component, inject, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import {Toast} from 'primeng/toast';
import {Title} from '../components/title/title';
import {Actions} from '../components/actions/actions';
import {Table} from '../components/table/table';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Room} from '../../../core/room/room.model';
import {RoomsManagerActions} from '../store/rooms-manager.actions';
import {RoomsManagerSelectors} from '../store/rooms-manager.selector';

@Component({
  selector: 'app-rooms-manager',
  imports: [
    Toast,
    Title,
    Actions,
    Table,
    AsyncPipe
  ],
  templateUrl: './rooms-manager.html',
  styleUrl: './rooms-manager.css',
})
export class RoomsManagerPage implements OnInit {
  protected rooms$: Observable<Room[]> = new Observable<Room[]>();

  protected loadingRooms$: Observable<boolean> = new Observable<boolean>();

  constructor(
    private store: Store,
  ) {}

  ngOnInit() {
    this.rooms$ = this.store.select(RoomsManagerSelectors.rooms);
    this.loadingRooms$ = this.store.select(RoomsManagerSelectors.loadingRooms);

    this.store.dispatch(RoomsManagerActions.loadRooms());
  }
}
