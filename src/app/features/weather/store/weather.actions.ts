import { createActionGroup, emptyProps } from '@ngrx/store';

export const WeatherActions = createActionGroup({
  source: 'Weather',
  events: {
    'Reset': emptyProps(),
  },
});
