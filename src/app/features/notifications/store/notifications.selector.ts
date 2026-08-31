import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from './notifications.state';

const selectNotificationsState =
  createFeatureSelector<NotificationsState>('notifications');

export const NotificationsSelectors = {
  notifications: createSelector(
    selectNotificationsState,
    state => state.notifications
  ),

  unreadCount: createSelector(
    selectNotificationsState,
    state => state.notifications.filter(n => !n.read).length
  ),

  error: createSelector(
    selectNotificationsState,
    state => state.error
  ),
};
