import {Component, inject, input, ViewChild} from '@angular/core';
import {Button} from "primeng/button";
import {Home, HomeRequest} from '../../../../core/home/home.model';
import {CommonModalAddHomeComponent} from '../../../common/modal/add/home/home';
import {HomeStore} from '../../../../core/home/home.store';

@Component({
  selector: 'homes-manager-actions',
  imports: [
    Button,
    CommonModalAddHomeComponent
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css',
})
export class HomesManagerActionsComponent {
  homes = input<Home[]>()
  loadingHomes = input<boolean>(false);

  @ViewChild(CommonModalAddHomeComponent) commonModalAddHome!: CommonModalAddHomeComponent;

  protected homeStore = inject(HomeStore);

  protected add(){
    this.commonModalAddHome.showModal()
  }

  protected addSubmit(home: HomeRequest){
    this.homeStore.addHome(home);
  }

  protected refresh() {
    this.homeStore.loadHomes();
  }
}
