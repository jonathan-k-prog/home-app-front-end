import { createReducer, on } from '@ngrx/store';
import { ChatBotActions } from './chat-bot.actions';
import { initialChatBotState } from './chat-bot.state';

export const ChatBotReducer = createReducer(
  initialChatBotState,

 /* on(ChatBotActions.selectConversation, (state, { conversation }) => ({
    ...state,
    selectedConversation: conversation,
  })),
  on(ChatBotActions.unselectConversation, (state) => ({
    ...state,
    selectedConversation: null,
  })),

  on(ChatBotActions.talk, (state) => ({
    ...state,
    thinking: true,
    error: null,
  })),

  on(ChatBotActions.talkSuccess, (state, { conversation, question, response }) => {
    if(state.selectedConversation){
      return {
        ...state,
        selectedConversation: {
          ...state.selectedConversation,
          messages: [...state.selectedConversation.messages, question, response]
        },
        thinking: false,
        error: null,
      };
    }else{
      return {
        ...state,
        conversations: [...state.conversations, conversation],
        selectedConversation: {
          ...conversation,
          messages: [question, response]
        },
        thinking: false,
        error: null,
      };
    }
  }),
  on(ChatBotActions.talkFailure, (state, { error }) => ({
    ...state,
    thinking: false,
    error,
  })),

  on(ChatBotActions.addConversation, (state) => ({
    ...state,
    loadingConversations: true,
    error: null,
  })),
  on(ChatBotActions.addConversationSuccess, (state, { conversation }) => ({
    ...state,
    conversations: [...state.conversations, conversation],
    loadingConversations: false,
    error: null,
  })),
  on(ChatBotActions.addConversationFailure, (state, { error }) => ({
    ...state,
    loadingConversations: false,
    error,
  })),

  on(ChatBotActions.loadConversations, (state) => ({
    ...state,
    conversations: [],
    loadingConversations: true,
    error: null,
  })),
  on(ChatBotActions.loadConversationsSuccess, (state, { conversations }) => ({
    ...state,
    conversations: conversations,
    loadingConversations: false,
    error: null,
  })),
  on(ChatBotActions.loadConversationsFailure, (state, { error }) => ({
    ...state,
    loadingConversations: false,
    error,
  })),

  on(ChatBotActions.updateConversation, (state) => ({
    ...state,
    loadingConversations: true,
    error: null,
  })),
  on(ChatBotActions.updateConversationSuccess, (state, { conversation }) => ({
    ...state,
    conversations: [...state.conversations.filter(tmp => tmp.id !== conversation.id), conversation],
    loadingConversations: false,
    error: null,
  })),
  on(ChatBotActions.updateConversationFailure, (state, { error }) => ({
    ...state,
    loadingConversations: false,
    error,
  })),*/

  on(ChatBotActions.deleteConversation, (state) => ({
    ...state,
    loadingConversations: true,
    error: null,
  })),
  on(ChatBotActions.deleteConversationSuccess, (state, { conversation }) => ({
    ...state,
    conversations: [...state.conversations.filter(tmp => tmp.id !== conversation.id)],
    loadingConversations: false,
    error: null,
  })),
  on(ChatBotActions.deleteConversationFailure, (state, { error }) => ({
    ...state,
    loadingConversations: false,
    error,
  })),

  on(ChatBotActions.reset, (state) => ({
    ...state
  }))
);
