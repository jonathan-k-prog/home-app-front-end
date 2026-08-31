import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import {apiRxMethod} from '../store/api-rx-method';
import {ConversationApi} from './conversation.api';
import {Conversation, ConversationRequest} from './conversation.model';

interface ConversationState {
  conversations: Conversation[];
  loadingConversations: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  loadingConversations: false,
  error: null
};

export const ConversationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    conversationApi = inject(ConversationApi),
    messageService =
    inject(MessageService)) => ({

    addConversation: apiRxMethod<ConversationRequest, Conversation, ConversationState>(
      store, messageService,
      (request) => conversationApi.add(request),
      (loadingConversations, error) => ({ loadingConversations, error }),
      (conversation) => ({ conversations: [...store.conversations(), conversation] }),
      {
        successSummary: 'Add Successful', successDetail: 'Conversation has been added successfully.',
        errorSummary: 'Add Failed', fallbackError: 'Conversation adding failed'
      },
    ),

    loadConversations: apiRxMethod<void, Conversation[], ConversationState>(
      store, messageService,
      () => conversationApi.getAll(),
      (loadingConversations, error) => ({ loadingConversations, error }),
      (conversations) => ({ conversations }),
      {
        successSummary: 'Load Successful', successDetail: 'Conversations have been loaded successfully.',
        errorSummary: 'Load Failed', fallbackError: 'Conversations loading failed'
      },
    ),

    updateConversation: apiRxMethod<Conversation, Conversation, ConversationState>(
      store, messageService,
      (request) => conversationApi.update(request.id, { ...request}),
      (loadingConversations, error) => ({ loadingConversations, error }),
      (conversation) => ({ conversations: [...store.conversations().filter(r => r.id !== conversation.id), conversation] }),
      {
        successSummary: 'Update Successful', successDetail: 'Conversation has been updated successfully.',
        errorSummary: 'Update Failed', fallbackError: 'Conversation updating failed'
      },
    ),

    deleteConversation: apiRxMethod<Conversation, Conversation, ConversationState>(
      store, messageService,
      (request) => conversationApi.delete(request.id),
      (loadingConversations, error) => ({ loadingConversations, error }),
      (conversation) => ({ conversations: [...store.conversations().filter(r => r.id !== conversation.id)]}),
      {
        successSummary: 'Delete Successful', successDetail: 'Conversation has been deleted successfully.',
        errorSummary: 'Delete Failed', fallbackError: 'Conversation deleting failed'
      },
    ),

    addConversationLocally(conversation: Conversation) {
      patchState(store, { conversations: [...store.conversations(), conversation] });
    },

    reset() {
      patchState(store, initialState);
    },
  })),
);

