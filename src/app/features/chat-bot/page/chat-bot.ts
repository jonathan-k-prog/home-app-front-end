import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import { ChatBotActionsComponent } from '../components/actions/actions';
import { ChatBotChatComponent } from '../components/chat/chat';
import { ChatBotConservationsComponent } from '../components/conservations/conservations';
import { Title } from '../components/title/title';
import {Toast} from 'primeng/toast';
import {Loading} from '../../common/modal/loading/loading';
import {ConversationStore} from '../../../core/conversation/conversation.store';
import {ChatBotStore} from '../chat-bot.store';
import {MessageStore} from '../../../core/message/message.store';

@Component({
  selector: 'app-chat-bot',
  imports: [
    Title,
    ChatBotActionsComponent,
    ChatBotConservationsComponent,
    ChatBotChatComponent,
    Toast,
    Loading,
  ],
  templateUrl: './chat-bot.html',
  styleUrl: './chat-bot.css',
})
export class ChatBotPage implements OnInit {
  @ViewChild(Loading) loadingModal!: Loading;

  protected messageStore = inject(MessageStore);
  protected conversationStore = inject(ConversationStore);
  protected chatBotStore = inject(ChatBotStore);

  constructor() {
    effect(() => {
      const loading = this.conversationStore.loadingConversations();
      if (loading) {
        setTimeout(() => {
          this.loadingModal.show();
        }, 10)
      } else {
        setTimeout(() => {
          this.loadingModal.close();
        }, 500)
      }
    });
  }

  ngOnInit() {
    this.conversationStore.loadConversations();
  }
}
