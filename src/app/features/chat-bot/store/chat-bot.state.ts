import {Conversation} from '../../../core/conversation/conversation.model';

export interface ChatBotState {
  conversations: Conversation[];
  selectedConversation: Conversation | null;

  loadingConversations: boolean;
  thinking: boolean;

  error: any;
}

export const initialChatBotState: ChatBotState = {
  conversations: [],
  selectedConversation: null,

  loadingConversations: false,
  thinking: false,

  error: null
};
