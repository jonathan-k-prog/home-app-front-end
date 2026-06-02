import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { initialAuthState } from './auth.state';

export const AuthReducer = createReducer(
  initialAuthState,

  on(AuthActions.reset, (state) => ({
    ...state,
  })),
);
