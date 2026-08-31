import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {MessageService} from 'primeng/api';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ConversationApi} from '../../../core/conversation/conversation.api';
import {ChatBotActions} from './chat-bot.actions';
import {ChatBotApi} from '../../../core/chat-bot/chat-bot.api';

@Injectable()
export class ChatBotEffects {
  private actions$ = inject(Actions);
  private chatBotApi = inject(ChatBotApi);
  private conversationApi = inject(ConversationApi);
  private messageService = inject(MessageService);

/*
  talk$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatBotActions.talk),
      switchMap((action) =>
        this.chatBotApi.talk({
          text: action.text,
          timestamp: action.timestamp,
          conversationId: action.conversationId
        }).pipe(
          map(({ data }) =>
            ChatBotActions.talkSuccess({ conversation: data.conversation, question: data.question, response: data.answer }),
          ),
          catchError(error =>
            of(
              ChatBotActions.talkFailure({
                error: error?.message ?? 'Chat Bot talking failed'
              })
            )
          )
        )
      )
    )
  );

  addConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatBotActions.addConversation),
      switchMap(() =>
        this.conversationApi.add({
          name: 'New Conversation',
          timestamp: Date.now(),
        }).pipe(
          map(({ data }) =>
            ChatBotActions.addConversationSuccess({ conversation: data })
          ),
          catchError(error =>
            of(
              ChatBotActions.addConversationFailure({
                error: error?.message ?? 'Conversation adding failed'
              })
            )
          )
        )
      )
    )
  );

  loadConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatBotActions.loadConversations),
      switchMap(() =>
        this.conversationApi.getAll().pipe(
          map(({ data }) =>
            ChatBotActions.loadConversationsSuccess({ conversations: data })
          ),
          catchError(error =>
            of(
              ChatBotActions.loadConversationsFailure({
                error: error?.message ?? 'Conversations loading failed'
              })
            )
          )
        )
      )
    )
  );

  updateConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatBotActions.updateConversation),
      switchMap((action) =>
        this.conversationApi.update(action.conversation.id, {
          name: action.conversation.name,
          timestamp: action.conversation.timestamp,
        }).pipe(
          map(({ data }) =>
            ChatBotActions.updateConversationSuccess({ conversation: data })
          ),
          catchError(error =>
            of(
              ChatBotActions.updateConversationFailure({
                error: error?.message ?? 'Conversation updating failed'
              })
            )
          )
        )
      )
    )
  );
*/

  deleteConversation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChatBotActions.deleteConversation),
      switchMap((action) =>
        this.conversationApi.delete(action.conversation.id).pipe(
          map(({ data }) =>
            ChatBotActions.deleteConversationSuccess({ conversation: data })
          ),
          catchError(error =>
            of(
              ChatBotActions.deleteConversationFailure({
                error: error?.message ?? 'Conversatio deleting failed'
              })
            )
          )
        )
      )
    )
  );

  /*---------------- Toast ----------------*/
/*
  showTalkToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          ChatBotActions.talkSuccess,
          ChatBotActions.talkFailure,
        ),
        tap(action => {
          if (action.type === ChatBotActions.talkSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Talk Successful',
              detail: 'Chat Bot has responded successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Add Failed',
              detail: (action as ReturnType<typeof ChatBotActions.talkFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showAddConversationToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          ChatBotActions.addConversationSuccess,
          ChatBotActions.addConversationFailure,
        ),
        tap(action => {
          if (action.type === ChatBotActions.addConversationSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Conversation has been added successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Add Failed',
              detail: (action as ReturnType<typeof ChatBotActions.addConversationFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showLoadConversationsToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          ChatBotActions.loadConversationsSuccess,
          ChatBotActions.loadConversationsFailure,
        ),
        tap(action => {
          if (action.type === ChatBotActions.loadConversationsSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Load Successful',
              detail: 'Conversations have been loaded successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Load Failed',
              detail: (action as ReturnType<typeof ChatBotActions.loadConversationsFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );

  showUpdateConversationToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          ChatBotActions.updateConversationSuccess,
          ChatBotActions.updateConversationFailure,
        ),
        tap(action => {
          if (action.type === ChatBotActions.updateConversationSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Update Successful',
              detail: 'Conversation has been updated successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Update Failed',
              detail: (action as ReturnType<typeof ChatBotActions.updateConversationFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );
*/

  showDeleteConversationToast$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          ChatBotActions.deleteConversationSuccess,
          ChatBotActions.deleteConversationFailure,
        ),
        tap(action => {
          if (action.type === ChatBotActions.deleteConversationSuccess.type) {
            this.messageService.add({
              severity: 'success',
              summary: 'Delete Successful',
              detail: 'Conversation has been deleted successfully.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Delete Failed',
              detail: (action as ReturnType<typeof ChatBotActions.deleteConversationFailure>).error
            });
          }
        })
      ),
    { dispatch: false }
  );
}
