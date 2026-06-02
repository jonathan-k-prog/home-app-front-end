import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/page/home').then(
        (module) => module.HomePage
      ),
  },
  {
    path: 'weather',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/weather/page/weather').then(
        (module) => module.WeatherPage
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/page/auth').then(
        (module) => module.AuthPage,
      ),
  },
  {
    path: 'rooms-manager',
    loadComponent: () =>
      import('./features/rooms-manager/page/rooms-manager').then(
        (module) => module.RoomsManagerPage,
      ),
  },
  {
    path: 'devices-manager',
    loadComponent: () =>
      import('./features/devices-manager/page/devices-manager').then(
        (module) => module.DevicesManagerPage,
      ),
  },
  {
    path: 'device-tracker',
    loadComponent: () =>
      import('./features/device-tracker/page/device-tracker').then(
        (module) => module.DeviceTrackerPage,
      ),
  },
  {
    path: 'room-tracker',
    loadComponent: () =>
      import('./features/room-tracker/page/room-tracker').then(
        (module) => module.RoomTrackerPage,
      ),
  },
];
