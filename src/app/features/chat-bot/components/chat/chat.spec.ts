import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBotChatComponent } from './chat';
import { ChatBotStore } from '../../chat-bot.store';
import { Conversation } from '../../../../core/conversation/conversation.model';
import { Message } from '../../../../core/message/message.model';

describe('ChatBotChatComponent', () => {
  let component: ChatBotChatComponent;
  let fixture: ComponentFixture<ChatBotChatComponent>;

  const mockConversation: Conversation = {
    id: 1,
    name: 'Test Conversation',
    timestamp: 1000,
    messages: [],
  };

  const mockMessages: Message[] = [
    { id: 1, text: 'Hello', timestamp: 1000, response: false },
    { id: 2, text: 'Hi there', timestamp: 1001, response: true },
  ];

  let talkSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    talkSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [ChatBotChatComponent],
      providers: [
        {
          provide: ChatBotStore,
          useValue: { talk: talkSpy },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBotChatComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a placeholder when there is no selected conversation', () => {
    fixture.componentRef.setInput('selectedConversation', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Start new conversation');
  });

  it('renders the messages of the selected conversation', () => {
    fixture.componentRef.setInput('selectedConversation', mockConversation);
    fixture.componentRef.setInput('messages', mockMessages);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Hello');
    expect(fixture.nativeElement.textContent).toContain('Hi there');
    expect(fixture.nativeElement.textContent).toContain('Me');
    expect(fixture.nativeElement.textContent).toContain('Chat-Bot');
  });

  it('disables the send button while the text field is empty', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[pButton]');
    expect(button.disabled).toBe(true);
  });

  it('talks with the currently selected conversation id', () => {
    fixture.componentRef.setInput('selectedConversation', mockConversation);
    fixture.detectChanges();

    (component as unknown as { form: { patchValue(v: object): void } }).form.patchValue({ text: 'Hello' });
    (component as unknown as { send(): void }).send();

    expect(talkSpy).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ text: 'Hello', conversationId: mockConversation.id }),
    );
  });

  it('talks with a null conversation id when there is no selected conversation', () => {
    fixture.componentRef.setInput('selectedConversation', null);
    fixture.detectChanges();

    (component as unknown as { form: { patchValue(v: object): void } }).form.patchValue({ text: 'Hello' });
    (component as unknown as { send(): void }).send();

    expect(talkSpy).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ text: 'Hello', conversationId: null }),
    );
  });
});
