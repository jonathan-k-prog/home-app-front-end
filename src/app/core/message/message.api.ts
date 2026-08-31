import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Config} from '../config';
import {Message, MessageRequest} from './message.model';

@Injectable({ providedIn: 'root' })
export class MessageApi {
  private baseUrl: string = '/api/messages';

  private http = inject(HttpClient);
  private config = inject(Config);

  add(request: MessageRequest) {
    return this.http.post<ApiResponse<{question: Message, response: Message}>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(conversationId: number | null){
    let params = new HttpParams();

    if (conversationId !== null) {
      params = params.set('conversationId', conversationId);
    }

    return this.http.get<ApiResponse<Message[]>>(`${this.config.apiUrl}${this.baseUrl}`, { params });
  }

}
