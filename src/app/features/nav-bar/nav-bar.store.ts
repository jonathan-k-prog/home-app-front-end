import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

interface NavBarState {
  error: string | null;
}

const initialState: NavBarState = {
  error: null
};

export const NavBarStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    messageService = inject(MessageService)) => ({


    reset() { patchState(store, initialState); },
  })),
);
