import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject, of, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ChatBotEffects } from './chat-bot.effects';
import { ChatBotActions } from './chat-bot.actions';
import { ConversationApi } from '../../../core/conversation/conversation.api';
import { ChatBotApi } from '../../../core/chat-bot/chat-bot.api';
import { Conversation } from '../../../core/conversation/conversation.model';
import { ApiResponse } from '../../../core/api-response/api-response.model';

describe('ChatBotEffects', () => {
  let actions$: Subject<any>;
  let effects: ChatBotEffects;
  let deleteSpy: ReturnType<typeof vi.fn>;
  let messageServiceAddSpy: ReturnType<typeof vi.fn>;

  const mockConversation: Conversation = {
    id: 1,
    name: 'Test Conversation',
    timestamp: 1000,
    messages: [],
  };

  beforeEach(() => {
    actions$ = new Subject();
    deleteSpy = vi.fn();
    messageServiceAddSpy = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        ChatBotEffects,
        provideMockActions(() => actions$),
        { provide: ConversationApi, useValue: { delete: deleteSpy } },
        { provide: ChatBotApi, useValue: {} },
        { provide: MessageService, useValue: { add: messageServiceAddSpy } },
      ],
    });

    effects = TestBed.inject(ChatBotEffects);
  });

  it('dispatches deleteConversationSuccess when the api call succeeds', () => {
    deleteSpy.mockReturnValue(of({ status: 'OK', message: '', errors: '', data: mockConversation } as ApiResponse<Conversation>));

    const results: unknown[] = [];
    effects.deleteConversation$.subscribe((action) => results.push(action));

    actions$.next(ChatBotActions.deleteConversation({ conversation: mockConversation }));

    expect(deleteSpy).toHaveBeenCalledExactlyOnceWith(mockConversation.id);
    expect(results).toEqual([ChatBotActions.deleteConversationSuccess({ conversation: mockConversation })]);
  });

  it('dispatches deleteConversationFailure when the api call fails', () => {
    deleteSpy.mockReturnValue(throwError(() => new Error('Network error')));

    const results: unknown[] = [];
    effects.deleteConversation$.subscribe((action) => results.push(action));

    actions$.next(ChatBotActions.deleteConversation({ conversation: mockConversation }));

    expect(results).toEqual([ChatBotActions.deleteConversationFailure({ error: 'Network error' })]);
  });

  it('shows a success toast on deleteConversationSuccess', () => {
    effects.showDeleteConversationToast$.subscribe();

    actions$.next(ChatBotActions.deleteConversationSuccess({ conversation: mockConversation }));

    expect(messageServiceAddSpy).toHaveBeenCalledExactlyOnceWith({
      severity: 'success', summary: 'Delete Successful', detail: 'Conversation has been deleted successfully.',
    });
  });

  it('shows an error toast on deleteConversationFailure', () => {
    effects.showDeleteConversationToast$.subscribe();

    actions$.next(ChatBotActions.deleteConversationFailure({ error: 'Delete failed' }));

    expect(messageServiceAddSpy).toHaveBeenCalledExactlyOnceWith({
      severity: 'error', summary: 'Delete Failed', detail: 'Delete failed',
    });
  });
});
