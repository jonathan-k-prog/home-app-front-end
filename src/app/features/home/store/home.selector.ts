import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HomeState} from './home.state';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const HomeSelectors = {
};

