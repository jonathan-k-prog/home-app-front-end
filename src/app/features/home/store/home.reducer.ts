import {createReducer, on} from '@ngrx/store';
import {initialHomeState} from './home.state';
import {HomeActions} from './home.actions';

export const HomeReducer = createReducer(
  initialHomeState,

  on(HomeActions.reset, (state) => ({
    ...state
  }))
)
