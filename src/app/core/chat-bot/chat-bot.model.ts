import {Conversation} from '../conversation/conversation.model';
import {Message} from '../message/message.model';

export interface ChatBotRequest {
  text: string;
  timestamp: number;
  conversationId: number | null;
}


export interface ChatBotResponse {
  conversation: Conversation;
  question: Message;
  answer: Message;
}
