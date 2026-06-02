import { createReducer, on } from '@ngrx/store';
import { WeatherActions } from './weather.actions';
import { initialWeatherState } from './weather.state';

export const WeatherReducer = createReducer(
  initialWeatherState,

  on(WeatherActions.reset, (state) => ({
    ...state,
  })),
);
