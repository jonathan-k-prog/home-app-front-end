import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import {Conversation} from '../../core/conversation/conversation.model';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {of, pipe} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {ChatBotApi} from '../../core/chat-bot/chat-bot.api';
import {ChatBotRequest} from '../../core/chat-bot/chat-bot.model';
import {ConversationStore} from '../../core/conversation/conversation.store';
import {MessageStore} from '../../core/message/message.store';

interface ChatBotState {
  selectedConversation: Conversation | null;
  loadingConversation: boolean;
  error: string | null;
}

const initialState: ChatBotState = {
  selectedConversation: null,
  loadingConversation: false,
  error: null
};

export const ChatBotStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    chatBotApi = inject(ChatBotApi),
    conversationStore = inject(ConversationStore),
    messageStore = inject(MessageStore),
    messageService = inject(MessageService)
  ) => ({

    selectConversation(conversation: Conversation) {
      patchState(store, { selectedConversation: conversation });
      messageStore.loadMessages(conversation.id);
    },

    unselectConversation() {
      patchState(store, { selectedConversation: null });
      messageStore.reset();
    },

    talk: rxMethod<ChatBotRequest>(pipe(
      switchMap((request) => {
        patchState(store, { loadingConversation: true });
        return chatBotApi.talk(request).pipe(
          tap(({ data }) => {
            if (!request.conversationId) {
              conversationStore.addConversationLocally(data.conversation);
              patchState(store, { selectedConversation: data.conversation });
            }
            messageStore.addMessagesLocally(data.question, data.answer);
            patchState(store, { loadingConversation: false });
          }),
          catchError(() => {
            patchState(store, { loadingConversation: false });
            messageService.add({ severity: 'error', summary: 'Talk Failed', detail: 'Message sending failed' });
            return of(null);
          }),
        );
      }),
    )),

    reset() {
      patchState(store, initialState);
    },
  })),
);
