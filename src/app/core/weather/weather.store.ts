import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import {apiRxMethod} from '../store/api-rx-method';
import {Weather} from './weather.model';
import {WeatherApi} from './weather.api';

interface WeatherState {
  weather: Weather | null;
  loadingWeather: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: null,
  loadingWeather: false,
  error: null
};

export const WeatherStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    weatherApi = inject(WeatherApi),
    messageService = inject(MessageService)) => ({

    fetchWeather: apiRxMethod<void, Weather, WeatherState>(
      store, messageService,
      () => weatherApi.fetch(),
      (loadingWeather, error) => ({ loadingWeather, error }),
      (weather) => ({ weather }),
      {
        successSummary: 'Fetch Successful', successDetail: 'Weather has been fetched successfully.',
        errorSummary: 'Fetch Failed', fallbackError: 'Weather fetching failed'
      },
    ),

    reset() { patchState(store, initialState); },
  })),
);
