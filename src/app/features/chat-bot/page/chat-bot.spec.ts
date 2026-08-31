import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ChatBotPage } from './chat-bot';
import { ConversationStore } from '../../../core/conversation/conversation.store';
import { ChatBotStore } from '../chat-bot.store';
import { MessageStore } from '../../../core/message/message.store';
import { Conversation } from '../../../core/conversation/conversation.model';
import { Message } from '../../../core/message/message.model';
import { Loading } from '../../common/modal/loading/loading';

describe('ChatBotPage', () => {
  let component: ChatBotPage;
  let fixture: ComponentFixture<ChatBotPage>;

  const mockConversation: Conversation = {
    id: 1,
    name: 'Test Conversation',
    timestamp: 1000,
    messages: [],
  };

  let conversationsSignal: ReturnType<typeof signal<Conversation[]>>;
  let loadingConversationsSignal: ReturnType<typeof signal<boolean>>;
  let loadConversationsSpy: ReturnType<typeof vi.fn>;

  let selectedConversationSignal: ReturnType<typeof signal<Conversation | null>>;
  let talkSpy: ReturnType<typeof vi.fn>;
  let selectConversationSpy: ReturnType<typeof vi.fn>;
  let unselectConversationSpy: ReturnType<typeof vi.fn>;

  let messagesSignal: ReturnType<typeof signal<Message[]>>;
  let resetSpy: ReturnType<typeof vi.fn>;
  let loadMessagesSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    conversationsSignal = signal<Conversation[]>([]);
    loadingConversationsSignal = signal(false);
    loadConversationsSpy = vi.fn();

    selectedConversationSignal = signal<Conversation | null>(null);
    talkSpy = vi.fn();
    selectConversationSpy = vi.fn();
    unselectConversationSpy = vi.fn();

    messagesSignal = signal<Message[]>([]);
    resetSpy = vi.fn();
    loadMessagesSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [ChatBotPage],
      providers: [
        MessageService,
        {
          provide: ConversationStore,
          useValue: {
            conversations: conversationsSignal,
            loadingConversations: loadingConversationsSignal,
            loadConversations: loadConversationsSpy,
          },
        },
        {
          provide: ChatBotStore,
          useValue: {
            selectedConversation: selectedConversationSignal,
            talk: talkSpy,
            selectConversation: selectConversationSpy,
            unselectConversation: unselectConversationSpy,
          },
        },
        {
          provide: MessageStore,
          useValue: {
            messages: messagesSignal,
            reset: resetSpy,
            loadMessages: loadMessagesSpy,
          },
        },
      ],
    })
      .overrideComponent(Loading, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(ChatBotPage);
    component = fixture.componentInstance;
  });

  it('should create the page', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('loads the conversations on init', () => {
    fixture.detectChanges();

    expect(loadConversationsSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('shows the loading modal while the conversations are loading', () => {
    vi.useFakeTimers();

    fixture.detectChanges();
    loadingConversationsSignal.set(true);
    fixture.detectChanges();
    vi.advanceTimersByTime(10);

    const loadingModal = (component as unknown as { loadingModal: { visible: boolean } }).loadingModal;
    expect(loadingModal.visible).toBe(true);

    vi.useRealTimers();
  });

  it('closes the loading modal once the conversations have loaded', () => {
    vi.useFakeTimers();

    fixture.detectChanges();
    loadingConversationsSignal.set(true);
    fixture.detectChanges();
    vi.advanceTimersByTime(10);
    fixture.detectChanges();

    loadingConversationsSignal.set(false);
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();

    const loadingModal = (component as unknown as { loadingModal: { visible: boolean } }).loadingModal;
    expect(loadingModal.visible).toBe(false);

    vi.useRealTimers();
  });

  it('renders the conversations from the store', () => {
    conversationsSignal.set([mockConversation]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Conversation');
  });
});
