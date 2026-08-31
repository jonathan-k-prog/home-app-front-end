import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import {homeSelectedGuard} from './core/home/home.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home-dashboard',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/page/auth').then(
        (module) => module.AuthPage,
      ),
  },
  {
    path: 'home-dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home-dashboard/page/home-dashboard').then(
        (module) => module.HomeDashboardPage
      ),
  },
  {
    path: 'homes-manager',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/homes-manager/page/homes-manager.page').then(
        (module) => module.HomesManagerPage
      ),
  },
  {
    path: 'home-plan',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home-plan/page/home-plan').then(
        (module) => module.HomePlanPage
      ),
  },
  {
    path: 'weather',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/weather/page/weather.page').then(
        (module) => module.WeatherPage
      ),
  },
  {
    path: 'rooms-manager',
    canActivate: [authGuard, homeSelectedGuard],
    loadComponent: () =>
      import('./features/rooms-manager/page/rooms-manager.page').then(
        (module) => module.RoomsManagerPage,
      ),
  },
  {
    path: 'devices-manager',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/devices-manager/page/devices-manager.page').then(
        (module) => module.DevicesManagerPage,
      ),
  },
  {
    path: 'chat-bot',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/chat-bot/page/chat-bot').then(
        (module) => module.ChatBotPage,
      ),
  },
  {
    path: 'device-tracker',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/device-tracker/page/device-tracker').then(
        (module) => module.DeviceTrackerPage,
      ),
  },
  {
    path: 'room-tracker',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/room-tracker/page/room-tracker').then(
        (module) => module.RoomTrackerPage,
      ),
  },
];
