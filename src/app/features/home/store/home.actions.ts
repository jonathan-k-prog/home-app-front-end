import {createAction, createActionGroup, emptyProps} from '@ngrx/store';

export const HomeActions = createActionGroup({
  source: 'Home',
  events: {
    'Reset': emptyProps(),
  }
});
