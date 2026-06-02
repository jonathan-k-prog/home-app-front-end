import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {NgClass} from '@angular/common';
import {Badge} from 'primeng/badge';
import {Menubar} from 'primeng/menubar';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'common-nav-bar',
  imports: [
    Avatar,
    NgClass,
    Badge,
    Menubar,
    Ripple
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class CommonNavBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'fa-solid fa-house',
        route: '/'
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

  protected isRouteActivated(route: string) {
    return this.router.url === route;
  }

  protected navigate(route: string) {
    this.router.navigate([route]);
  }
}
