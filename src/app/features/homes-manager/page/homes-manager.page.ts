import {Component, inject} from '@angular/core';
import {Toast} from 'primeng/toast';
import {HomesManagerTitleComponent} from '../components/title/title.component';
import {HomesManagerActionsComponent} from '../components/actions/actions.component';
import {HomesManagerTableComponent} from '../components/table/table.component';
import {HomeStore} from '../../../core/home/home.store';

@Component({
  selector: 'app-homes-manager',
  imports: [
    HomesManagerTitleComponent,
    HomesManagerActionsComponent,
    HomesManagerTableComponent,
    Toast,
  ],
  templateUrl: './homes-manager.page.html',
  styleUrl: './homes-manager.page.css',
})
export class HomesManagerPage {
  protected homeStore = inject(HomeStore);

  ngOnInit() {
    this.homeStore.loadHomes();
  }
}
