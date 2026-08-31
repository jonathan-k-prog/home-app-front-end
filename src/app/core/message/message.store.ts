import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import {apiRxMethod} from '../store/api-rx-method';
import {Message, MessageRequest} from './message.model';
import {MessageApi} from './message.api';


interface MessageState {
  messages: Message[];
  loadingMessages: boolean;
  error: string | null;
}

const initialState: MessageState = {
  messages: [],
  loadingMessages: false,
  error: null
};

export const MessageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    messageApi = inject(MessageApi),
    messageService =
    inject(MessageService)) => ({

    loadMessages: apiRxMethod<number, Message[], MessageState>(
      store, messageService,
      (conversationId) => messageApi.getAll(conversationId),
      (loadingMessages, error) => ({ loadingMessages, error }),
      (messages) => ({ messages }),
      {
        successSummary: 'Load Successful', successDetail: 'Messages have been loaded successfully.',
        errorSummary: 'Load Failed', fallbackError: 'Messages loading failed'
      },
    ),

    addMessagesLocally(...messages: Message[]) {
      patchState(store, { messages: [...store.messages(), ...messages] });
    },

    reset() {
      patchState(store, initialState);
    },
  })),
);

