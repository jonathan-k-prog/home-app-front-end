import {Component, inject, input, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Conversation} from '../../../../core/conversation/conversation.model';
import {ButtonGroup} from 'primeng/buttongroup';
import {Tooltip} from 'primeng/tooltip';
import {ChatBotStore} from '../../chat-bot.store';
import {MessageStore} from '../../../../core/message/message.store';

@Component({
  selector: 'chat-bot-conservations',
  imports: [
    Card,
    Button,
    TableModule,
    ButtonGroup,
    Tooltip
  ],
  templateUrl: './conservations.html',
  styleUrl: './conservations.css',
})
export class ChatBotConservationsComponent {
  conversations = input<Conversation[]>([])

  protected messageStore = inject(MessageStore);
  protected chatBotStore = inject(ChatBotStore);

  protected addConversation() {
    this.chatBotStore.unselectConversation();
    this.messageStore.reset();
  }

  protected selectConversation(conversation: Conversation) {
    this.chatBotStore.selectConversation(conversation);
    this.messageStore.loadMessages(conversation.id);
  }

  protected deleteConversation(conversation: Conversation) {
    //this.chatBotStore.unselectConversation();
   // this.messageStore.reset();
    //this.store.dispatch(ChatBotActions.deleteConversation({ conversation }))
  }
}
