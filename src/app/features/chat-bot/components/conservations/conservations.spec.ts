import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBotConservationsComponent } from './conservations';
import { ChatBotStore } from '../../chat-bot.store';
import { MessageStore } from '../../../../core/message/message.store';
import { Conversation } from '../../../../core/conversation/conversation.model';

describe('ChatBotConservationsComponent', () => {
  let component: ChatBotConservationsComponent;
  let fixture: ComponentFixture<ChatBotConservationsComponent>;

  const mockConversation: Conversation = {
    id: 1,
    name: 'Test Conversation',
    timestamp: 1000,
    messages: [],
  };

  let unselectConversationSpy: ReturnType<typeof vi.fn>;
  let selectConversationSpy: ReturnType<typeof vi.fn>;
  let resetSpy: ReturnType<typeof vi.fn>;
  let loadMessagesSpy: ReturnType<typeof vi.fn>;

  function clickButton(label: string) {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
    const button = buttons.find((b) => b.textContent?.includes(label));
    button?.click();
  }

  beforeEach(async () => {
    unselectConversationSpy = vi.fn();
    selectConversationSpy = vi.fn();
    resetSpy = vi.fn();
    loadMessagesSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [ChatBotConservationsComponent],
      providers: [
        {
          provide: ChatBotStore,
          useValue: {
            unselectConversation: unselectConversationSpy,
            selectConversation: selectConversationSpy,
          },
        },
        {
          provide: MessageStore,
          useValue: {
            reset: resetSpy,
            loadMessages: loadMessagesSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBotConservationsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a button per conversation', () => {
    fixture.componentRef.setInput('conversations', [mockConversation]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Conversation');
  });

  it('unselects the conversation and resets the messages when starting a new one', () => {
    fixture.detectChanges();

    clickButton('New Conversation');

    expect(unselectConversationSpy).toHaveBeenCalledExactlyOnceWith();
    expect(resetSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('selects a conversation and loads its messages', () => {
    fixture.componentRef.setInput('conversations', [mockConversation]);
    fixture.detectChanges();

    clickButton('Test Conversation');

    expect(selectConversationSpy).toHaveBeenCalledExactlyOnceWith(mockConversation);
    expect(loadMessagesSpy).toHaveBeenCalledExactlyOnceWith(mockConversation.id);
  });

  it('does not throw when deleting a conversation', () => {
    (component as unknown as { deleteConversation(c: Conversation): void }).deleteConversation(mockConversation);

    expect(unselectConversationSpy).not.toHaveBeenCalled();
    expect(resetSpy).not.toHaveBeenCalled();
  });
});
