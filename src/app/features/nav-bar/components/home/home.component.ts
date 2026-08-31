import {Component, effect, inject, input} from '@angular/core';
import {Select} from 'primeng/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeStore} from '../../../../core/home/home.store';
import {Home} from '../../../../core/home/home.model';

@Component({
  selector: 'nav-bar-home',
  imports: [
    Select,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class NavBarHome {
  public homes = input<Home[]>([]);

  protected selectedHome: Home | undefined;

  private homeStore = inject(HomeStore);

  constructor() {
    effect(() => {
      if (this.homeStore.loadingCurrent()) {
        return;
      }

      const current = this.homeStore.current();
      if (current) {
        this.selectedHome = current;
      }
    });
  }

  onHomeChange(home: Home) {
    this.homeStore.setLocal(home);
  }
}
