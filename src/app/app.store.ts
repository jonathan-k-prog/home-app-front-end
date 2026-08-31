import {ChatBotEffects} from './features/chat-bot/store/chat-bot.effects';
import {ChatBotReducer} from './features/chat-bot/store/chat-bot.reducer';
import {NotificationsEffects} from './features/notifications/store/notifications.effects';
import {NotificationsReducer} from './features/notifications/store/notifications.reducer';

export const rootReducers = {
  chatBot: ChatBotReducer,
  notifications: NotificationsReducer,
};

export const rootEffects = [
  ChatBotEffects,
  NotificationsEffects,
];
