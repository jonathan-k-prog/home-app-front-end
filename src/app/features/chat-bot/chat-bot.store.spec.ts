import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { ChatBotStore } from './chat-bot.store';
import { ConversationStore } from '../../core/conversation/conversation.store';
import { MessageStore } from '../../core/message/message.store';
import { Conversation } from '../../core/conversation/conversation.model';
import { Message } from '../../core/message/message.model';
import { ChatBotResponse } from '../../core/chat-bot/chat-bot.model';

describe('ChatBotStore', () => {
  let httpMock: HttpTestingController;

  const mockConversation: Conversation = {
    id: 1,
    name: 'Test Conversation',
    timestamp: 1000,
    messages: [],
  };

  const mockQuestion: Message = { id: 1, text: 'Hello', timestamp: 1000, response: false };
  const mockAnswer: Message = { id: 2, text: 'Hi', timestamp: 1001, response: true };

  let addConversationLocallySpy: ReturnType<typeof vi.fn>;
  let addMessagesLocallySpy: ReturnType<typeof vi.fn>;
  let loadMessagesSpy: ReturnType<typeof vi.fn>;
  let resetMessagesSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    addConversationLocallySpy = vi.fn();
    addMessagesLocallySpy = vi.fn();
    loadMessagesSpy = vi.fn();
    resetMessagesSpy = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(), MessageService,
        {
          provide: ConversationStore,
          useValue: { addConversationLocally: addConversationLocallySpy },
        },
        {
          provide: MessageStore,
          useValue: {
            addMessagesLocally: addMessagesLocallySpy,
            loadMessages: loadMessagesSpy,
            reset: resetMessagesSpy,
          },
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('starts with an empty state', () => {
    const store = TestBed.inject(ChatBotStore);

    expect(store.selectedConversation()).toBeNull();
    expect(store.loadingConversation()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('selects a conversation and loads its messages', () => {
    const store = TestBed.inject(ChatBotStore);

    store.selectConversation(mockConversation);

    expect(store.selectedConversation()).toEqual(mockConversation);
    expect(loadMessagesSpy).toHaveBeenCalledExactlyOnceWith(mockConversation.id);
  });

  it('unselects the conversation and resets the messages', () => {
    const store = TestBed.inject(ChatBotStore);
    store.selectConversation(mockConversation);

    store.unselectConversation();

    expect(store.selectedConversation()).toBeNull();
    expect(resetMessagesSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('starts a new conversation on talk success when none is selected', () => {
    const store = TestBed.inject(ChatBotStore);

    store.talk({ text: 'Hello', timestamp: 1000, conversationId: null });

    const req = httpMock.expectOne(r => r.url === '/api/chat-bot');
    expect(req.request.method).toBe('POST');

    req.flush({
      status: 'OK', message: '', errors: '',
      data: { conversation: mockConversation, question: mockQuestion, answer: mockAnswer },
    } as ApiResponse<ChatBotResponse>);

    expect(addConversationLocallySpy).toHaveBeenCalledExactlyOnceWith(mockConversation);
    expect(store.selectedConversation()).toEqual(mockConversation);
    expect(addMessagesLocallySpy).toHaveBeenCalledExactlyOnceWith(mockQuestion, mockAnswer);
    expect(store.loadingConversation()).toBe(false);
  });

  it('continues an existing conversation on talk success without re-adding it', () => {
    const store = TestBed.inject(ChatBotStore);
    store.selectConversation(mockConversation);

    store.talk({ text: 'Hello', timestamp: 1000, conversationId: mockConversation.id });

    const req = httpMock.expectOne(r => r.url === '/api/chat-bot');
    req.flush({
      status: 'OK', message: '', errors: '',
      data: { conversation: mockConversation, question: mockQuestion, answer: mockAnswer },
    } as ApiResponse<ChatBotResponse>);

    expect(addConversationLocallySpy).not.toHaveBeenCalled();
    expect(addMessagesLocallySpy).toHaveBeenCalledExactlyOnceWith(mockQuestion, mockAnswer);
  });

  it('stops loading and does not add messages on talk failure', () => {
    const store = TestBed.inject(ChatBotStore);

    store.talk({ text: 'Hello', timestamp: 1000, conversationId: null });

    const req = httpMock.expectOne(r => r.url === '/api/chat-bot');
    req.flush('fetch failed', { status: 500, statusText: 'Server Error' });

    expect(store.loadingConversation()).toBe(false);
    expect(addMessagesLocallySpy).not.toHaveBeenCalled();
  });

  it('resets to the initial state', () => {
    const store = TestBed.inject(ChatBotStore);
    store.selectConversation(mockConversation);

    store.reset();

    expect(store.selectedConversation()).toBeNull();
    expect(store.loadingConversation()).toBe(false);
    expect(store.error()).toBeNull();
  });
});
