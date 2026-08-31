import {Component, effect, inject, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {Badge} from 'primeng/badge';
import {NgClass} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {NavBarNotifications} from '../components/notifications/notifications.component';
import {NavBarUser} from '../components/user/user.component';
import {Ripple} from 'primeng/ripple';
import {LogoComponent} from '../components/logo/logo.component';
import {NavBarHome} from '../components/home/home.component';
import {HomeStore} from '../../../core/home/home.store';
import {NotificationStore} from '../../../core/notification/notification.store';

@Component({
  selector: 'app-nav-bar',
  imports: [
    Menubar,
    Badge,
    NgClass,
    NavBarNotifications,
    NavBarUser,
    Ripple,
    LogoComponent,
    NavBarHome
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  protected items: MenuItem[] | undefined;

  protected homeStore = inject(HomeStore);
  protected notificationStore = inject(NotificationStore);
  private router: Router = inject(Router);

  constructor() {
    effect(() => {
      if (this.homeStore.loadingCurrent()) {
        return;
      }

      const current = this.homeStore.current();
      if (current) {
        this.items = this.selectedHomeItems;
      } else {
        this.items = this.noHomeItems;
      }
    });
  }

  ngOnInit() {
    this.homeStore.loadHomes();


    this.notificationStore.loadNotifications();
    this.notificationStore.connect();
  }

  protected isRouteActivated(route: string) {
    return this.router.url === route;
  }

  protected navigate(route: string) {
    this.router.navigate([route]);
  }

  private noHomeItems = [
    {
      label: 'Homes',
      icon: 'fa-solid fa-house',
      items: [
        {
          label: 'Dashboard',
          icon: 'fa-solid fa-eye',
          shortcut: '⌘+S',
          route: '/home-dashboard'
        },
        {
          label: 'Manager',
          icon: 'fa-solid fa-list',
          shortcut: '⌘+S',
          route: '/homes-manager'
        },
        {
          label: 'Plan',
          icon: 'fa-solid fa-map-location-dot',
          route: '/home-plan'
        },
      ]
    },
    {
      label: 'Chat bot',
      icon: 'fa-solid fa-robot',
      route: '/chat-bot'
    },
    {
      label: 'Reports',
      icon: 'fa-solid fa-chart-area',
      items: [
        {
          label: 'Weather',
          icon: 'fa-solid fa-cloud-sun',
          shortcut: '⌘+S',
          route: '/weather'
        },
      ]
    },
  ];

  private selectedHomeItems = [
    {
      label: 'Homes',
      icon: 'fa-solid fa-house',
      items: [
        {
          label: 'Dashboard',
          icon: 'fa-solid fa-eye',
          shortcut: '⌘+S',
          route: '/home-dashboard'
        },
        {
          label: 'Manager',
          icon: 'fa-solid fa-list',
          shortcut: '⌘+S',
          route: '/homes-manager'
        },
        {
          label: 'Plan',
          icon: 'fa-solid fa-map-location-dot',
          route: '/home-plan'
        },
      ]
    },
    {
      label: 'Chat bot',
      icon: 'fa-solid fa-robot',
      route: '/chat-bot'
    },
    {
      label: 'Reports',
      icon: 'fa-solid fa-chart-area',
      items: [
        {
          label: 'Weather',
          icon: 'fa-solid fa-cloud-sun',
          shortcut: '⌘+S',
          route: '/weather'
        },
      ]
    },
    {
      label: 'Rooms',
      icon: 'fa-solid fa-person-shelter',
      items: [
        {
          label: 'Manager',
          icon: 'fa-solid fa-list',
          shortcut: '⌘+S',
          route: '/rooms-manager'
        },
        {
          label: 'Tracker',
          icon: 'fa-solid fa-eye',
          shortcut: '⌘+S',
          route: '/room-tracker'
        },
      ]
    },
    {
      label: 'Devices',
      icon: 'fa-solid fa-warehouse',
      items: [
        {
          label: 'Manager',
          icon: 'fa-solid fa-list',
          shortcut: '⌘+S',
          route: '/devices-manager'
        },
        {
          label: 'Tracker',
          icon: 'fa-solid fa-eye',
          shortcut: '⌘+S',
          route: '/device-tracker'
        },
      ]
    },
  ];
}
