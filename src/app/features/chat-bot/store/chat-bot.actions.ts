import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Conversation} from '../../../core/conversation/conversation.model';

export const ChatBotActions = createActionGroup({
  source: 'Chat Bot',
  events: {
 /*   'Select Conversation': props<{ conversation: Conversation }>(),
    'Unselect Conversation': emptyProps(),

    'Talk': props<{ text: string, timestamp: number, conversationId: number | null }>(),
    'Talk Success': props<{ conversation: Conversation, question: Message, response: Message }>(),
    'Talk Failure': props<{ error: string }>(),

    'Add Conversation': emptyProps(),
    'Add Conversation Success': props<{ conversation: Conversation }>(),
    'Add Conversation Failure': props<{ error: string }>(),

    'Load Conversations': emptyProps(),
    'Load Conversations Success': props<{ conversations: Conversation[] }>(),
    'Load Conversations Failure': props<{ error: string }>(),

    'Update Conversation': props<{ conversation: Conversation }>(),
    'Update Conversation Success': props<{ conversation: Conversation }>(),
    'Update Conversation Failure': props<{ error: string }>(),*/

    'Delete Conversation': props<{ conversation: Conversation }>(),
    'Delete Conversation Success': props<{ conversation: Conversation }>(),
    'Delete Conversation Failure': props<{ error: string }>(),

    'Reset': emptyProps(),
  }
});
