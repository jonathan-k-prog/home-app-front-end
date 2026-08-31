import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

interface RoomsManagerState {
  error: string | null;
}

const initialState: RoomsManagerState = {
  error: null
};

export const RoomsManagerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    messageService = inject(MessageService)) => ({

    reset() { patchState(store, initialState); },
  })),
);
