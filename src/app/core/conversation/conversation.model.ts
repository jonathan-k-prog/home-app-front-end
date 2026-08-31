import {Message} from '../message/message.model';

export interface Conversation {
  id: number;
  name: string;
  timestamp: number;
  messages: Message[];
}

export interface ConversationRequest {
  name: string;
  timestamp: number;
}
