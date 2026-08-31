import {Component, inject, OnInit} from '@angular/core';
import {Toast} from 'primeng/toast';
import {RoomsManagerTitleComponent} from '../components/title/title.component';
import {RoomsManagerActionsComponent} from '../components/actions/actions.component';
import {RoomsManagerTableComponent} from '../components/table/table.component';
import {HomeStore} from '../../../core/home/home.store';
import {RoomStore} from '../../../core/room/room.store';

@Component({
  selector: 'app-rooms-manager',
  imports: [
    Toast,
    RoomsManagerTitleComponent,
    RoomsManagerActionsComponent,
    RoomsManagerTableComponent,
  ],
  templateUrl: './rooms-manager.page.html',
  styleUrl: './rooms-manager.page.css',
})
export class RoomsManagerPage implements OnInit {
  protected roomStore = inject(RoomStore);
  protected homeStore = inject(HomeStore);

  ngOnInit() {
    const currentHome = this.homeStore.current();

    if(currentHome){
      this.roomStore.loadRoomsByHomeId(currentHome.id);
    }
  }
}
