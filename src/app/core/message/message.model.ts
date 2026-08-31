export interface Message {
  id: number;
  text: string;
  timestamp: number;
  response: boolean;
}

export interface MessageRequest {
  text: string;
  timestamp: number;
  conversationId: number;
}
