import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

interface HomesManagerState {
  error: string | null;
}

const initialState: HomesManagerState = {
  error: null
};

export const HomesManagerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, messageService =
  inject(MessageService)) => ({


    reset() {
      patchState(store, initialState);
    },
  })),
);
