import { createReducer, on } from '@ngrx/store';
import { initialNotificationsState } from './notifications.state';
import { NotificationsActions } from './notifications.actions';

export const NotificationsReducer = createReducer(
  initialNotificationsState,

  on(NotificationsActions.addNotification, (state, { notification }) => ({
    ...state,
    notifications: [notification, ...state.notifications],
    error: null,
  })),

  on(NotificationsActions.dismiss, (state, { id }) => ({
    ...state,
    notifications: state.notifications.filter(n => n.id !== id),
  })),

  on(NotificationsActions.markAllAsRead, state => ({
    ...state,
    notifications: state.notifications.map(n => ({ ...n, read: true })),
  })),

  on(NotificationsActions.connectionError, (state, { error }) => ({
    ...state,
    error,
  })),


/*  on(NotificationsActions.loadNotifications, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(NotificationsActions.loadNotificationsSuccess, (state, { notifications }) => ({
    ...state,
    notifications: [...state.notifications, ...notifications],
    loading: false,
    error: null,
  })),
  on(NotificationsActions.loadNotificationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),*/

  /*on(NotificationsActions.updateNotification, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(NotificationsActions.updateNotificationSuccess, (state, { notification }) => ({
    ...state,
    notifications: [...state.notifications.filter(tmp => tmp.id !== notification.id), notification],
    loading: false,
    error: null,
  })),
  on(NotificationsActions.updateNotificationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(NotificationsActions.deleteNotification, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(NotificationsActions.deleteNotificationSuccess, (state, { notification }) => ({
    ...state,
    notifications: [...state.notifications.filter(tmp => tmp.id !== notification.id)],
    loading: false,
    error: null,
  })),
  on(NotificationsActions.deleteNotificationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),*/
);
