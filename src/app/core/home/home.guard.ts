import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { HomeStore } from './home.store';

export const homeSelectedGuard: CanActivateFn = () => {
  const homeStore = inject(HomeStore);
  const router = inject(Router);

  return toObservable(homeStore.loadingCurrent).pipe(
    filter(loading => !loading),
    take(1),
    map(() => homeStore.current() ? true : router.parseUrl('/homes-manager')),
  );
};
