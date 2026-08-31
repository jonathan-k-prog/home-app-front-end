import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HomeApi } from './home.api';
import { Home, HomeRequest } from './home.model';
import {apiRxMethod} from '../store/api-rx-method';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {of, pipe} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';

const HOME_LOCAL_STORAGE_KEY = 'home-app.home.local';

interface HomeState {
  current: Home | null;
  loadingCurrent: boolean;
  homes: Home[];
  loadingHomes: boolean;
  error: string | null;
}

const initialState: HomeState = {
  current: null,
  loadingCurrent: false,
  homes: [],
  loadingHomes: false,
  error: null
};

export const HomeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    homeApi = inject(HomeApi),
    messageService =
  inject(MessageService)) => ({
    setLocal(home: Home) {
      patchState(store, { current: home });
      localStorage.setItem(HOME_LOCAL_STORAGE_KEY, String(home.id));
    },

    clearLocal() {
      patchState(store, { current: null });
      localStorage.removeItem(HOME_LOCAL_STORAGE_KEY);
    },

    restore: rxMethod<void>(pipe(
      switchMap(() => {
        const id = localStorage.getItem(HOME_LOCAL_STORAGE_KEY);
        if (!id) return of(null);

        patchState(store, { loadingCurrent: true });
        return homeApi.getById(Number(id)).pipe(
          tap(({ data }) => patchState(store, { current: data, loadingCurrent: false })),
          catchError(() => {
            localStorage.removeItem(HOME_LOCAL_STORAGE_KEY);
            patchState(store, { current: null, loadingCurrent: false });
            return of(null);
          }),
        );
      }),
    )),

    addHome: apiRxMethod<HomeRequest, Home, HomeState>(
      store, messageService,
      (request) => homeApi.add(request),
      (loadingHomes, error) => ({ loadingHomes, error }),
      (home) => ({ homes: [...store.homes(), home] }),
      {
        successSummary: 'Add Successful', successDetail: 'Home has been added successfully.',
        errorSummary: 'Add Failed', fallbackError: 'Home adding failed'
      },
    ),

    loadHomes: apiRxMethod<void, Home[], HomeState>(
      store, messageService,
      () => homeApi.getAll(),
      (loadingHomes, error) => ({ loadingHomes, error }),
      (homes) => ({ homes }),
      {
        successSummary: 'Load Successful', successDetail: 'Homes have been loaded successfully.',
        errorSummary: 'Load Failed', fallbackError: 'Homes loading failed'
      },
    ),

    updateHome: apiRxMethod<Home, Home, HomeState>(
      store, messageService,
      (request) => homeApi.update(request.id, { ...request}),
      (loadingHomes, error) => ({ loadingHomes, error }),
      (home) => ({ homes: [...store.homes().filter(r => r.id !== home.id), home], current: store.current()?.id === home.id ? home : store.current() }),
      {
        successSummary: 'Update Successful', successDetail: 'Home has been updated successfully.',
        errorSummary: 'Update Failed', fallbackError: 'Home updating failed'
      },
    ),

    deleteHome: apiRxMethod<Home, Home, HomeState>(
      store, messageService,
      (request) => homeApi.delete(request.id),
      (loadingHomes, error) => ({ loadingHomes, error }),
      (home) => ({ homes: [...store.homes().filter(r => r.id !== home.id)], current: store.current()?.id === home.id ? null : store.current() }),
      {
        successSummary: 'Delete Successful', successDetail: 'Home has been deleted successfully.',
        errorSummary: 'Delete Failed', fallbackError: 'Home deleting failed'
      },
    ),

    reset() {
      patchState(store, initialState);
    },
  })),
);

