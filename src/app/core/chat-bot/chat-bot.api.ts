import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config';
import {ApiResponse} from '../api-response/api-response.model';
import {ChatBotRequest, ChatBotResponse} from './chat-bot.model';

@Injectable({ providedIn: 'root' })
export class ChatBotApi {
  private baseUrl: string = '/api/chat-bot';

  private http = inject(HttpClient);
  private config = inject(Config);

  talk(request: ChatBotRequest) {
    return this.http.post<ApiResponse<ChatBotResponse>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }
}
