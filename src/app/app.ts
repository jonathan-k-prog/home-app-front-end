import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavBarComponent} from './features/nav-bar/page/nav-bar.component';
import {HomeStore} from './core/home/home.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private homeStore = inject(HomeStore);
  protected router: Router = inject(Router);


  ngOnInit() {
    console.log('restore');
    this.homeStore.restore()
  }
}
