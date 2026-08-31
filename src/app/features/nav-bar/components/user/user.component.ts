import {Component, inject, OnInit} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {Menu} from 'primeng/menu';
import {AuthService} from '../../../../core/auth/auth.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'nav-bar-user',
  imports: [
    Avatar,
    Menu
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class NavBarUser implements OnInit {
  protected userItems: MenuItem[] | undefined;

  protected authService = inject(AuthService);

  ngOnInit() {
    this.userItems = [
      {
        label: 'Profile',
        icon: 'fa-solid fa-user',
        route: '/'
      },
      {
        label: 'Settings',
        icon: 'fa-solid fa-gear',
        route: '/'
      },
      {
        label: 'Log out',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        route: '/floor-plan'
      },
    ];
  }
}
