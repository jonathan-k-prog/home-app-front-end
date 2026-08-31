import {Component, inject, input, Input, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {PrimeTemplate} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {DateFormatter} from '../../../../core/date/date.formatter';
import {Home} from '../../../../core/home/home.model';
import {CommonModalUpdateHomeComponent} from '../../../common/modal/update/home/home';
import {CommonModalDeleteHomeComponent} from '../../../common/modal/delete/home/home';
import {HomeStore} from '../../../../core/home/home.store';

@Component({
  selector: 'homes-manager-table',
  imports: [
    Button,
    PrimeTemplate,
    Skeleton,
    TableModule,
    CommonModalUpdateHomeComponent,
    CommonModalDeleteHomeComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class HomesManagerTableComponent {
  public homes = input<Home[]>([]);
  public loadingHomes = input<boolean>(false);

  @ViewChild(CommonModalUpdateHomeComponent) commonModalUpdateHome!: CommonModalUpdateHomeComponent;
  @ViewChild(CommonModalDeleteHomeComponent) commonModalDeleteHome!: CommonModalDeleteHomeComponent;

  private homeStore = inject(HomeStore);
  protected dateFormatter = inject(DateFormatter);

  protected update(home: Home) {
    this.commonModalUpdateHome.showModal(home);
  }

  protected updateSubmit(home: Home) {
    this.homeStore.updateHome(home);
  }

  protected delete(home: Home) {
    this.commonModalDeleteHome.showModal(home);
  }

  protected deleteSubmit(home: Home) {
    this.homeStore.deleteHome(home)
  }
}
