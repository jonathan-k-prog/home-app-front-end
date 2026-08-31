import { ChatBotReducer } from './chat-bot.reducer';
import { ChatBotActions } from './chat-bot.actions';
import { ChatBotState, initialChatBotState } from './chat-bot.state';
import { Conversation } from '../../../core/conversation/conversation.model';

describe('ChatBotReducer', () => {
  const mockConversation: Conversation = {
    id: 1,
    name: 'Test Conversation',
    timestamp: 1000,
    messages: [],
  };

  const stateWithConversation: ChatBotState = {
    ...initialChatBotState,
    conversations: [mockConversation],
  };

  it('returns the initial state for an unknown action', () => {
    const state = ChatBotReducer(undefined, { type: '@@INIT' } as any);

    expect(state).toEqual(initialChatBotState);
  });

  it('sets loadingConversations to true on deleteConversation', () => {
    const state = ChatBotReducer(initialChatBotState, ChatBotActions.deleteConversation({ conversation: mockConversation }));

    expect(state.loadingConversations).toBe(true);
    expect(state.error).toBeNull();
  });

  it('removes the conversation on deleteConversationSuccess', () => {
    const state = ChatBotReducer(
      { ...stateWithConversation, loadingConversations: true },
      ChatBotActions.deleteConversationSuccess({ conversation: mockConversation }),
    );

    expect(state.conversations).toEqual([]);
    expect(state.loadingConversations).toBe(false);
    expect(state.error).toBeNull();
  });

  it('sets an error on deleteConversationFailure', () => {
    const state = ChatBotReducer(
      { ...initialChatBotState, loadingConversations: true },
      ChatBotActions.deleteConversationFailure({ error: 'Delete failed' }),
    );

    expect(state.loadingConversations).toBe(false);
    expect(state.error).toBe('Delete failed');
  });

  it('leaves the state untouched on reset', () => {
    const state = ChatBotReducer(stateWithConversation, ChatBotActions.reset());

    expect(state).toEqual(stateWithConversation);
  });
});
