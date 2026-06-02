import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const WeatherSelectors = {
};
