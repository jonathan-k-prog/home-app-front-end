import {Component, inject, input} from '@angular/core';
import {Card} from 'primeng/card';
import {Conversation} from '../../../../core/conversation/conversation.model';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {ChatBotStore} from '../../chat-bot.store';
import {Message} from '../../../../core/message/message.model';

@Component({
  selector: 'chat-bot-chat',
  imports: [
    Card,
    InputText,
    ReactiveFormsModule,
    ButtonLabel,
    ButtonDirective,
    NgStyle
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class ChatBotChatComponent {

  selectedConversation = input<Conversation | null>(null)
  messages = input<Message[]>([])

  protected form!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private chatBotStore = inject(ChatBotStore);

  ngOnInit() {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  protected send() {
    const selectedConversation = this.selectedConversation();
    const text: string =  this.form.value.text

    if(selectedConversation) {
      this.chatBotStore.talk({ text: text, conversationId: selectedConversation.id, timestamp: Date.now() });
    }else{
      this.chatBotStore.talk({ text: text, conversationId: null, timestamp: Date.now() });
    }
  }
}
