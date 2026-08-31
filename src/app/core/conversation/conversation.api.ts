import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Config} from '../config';
import {Conversation, ConversationRequest} from './conversation.model';

@Injectable({ providedIn: 'root' })
export class ConversationApi {
  private baseUrl: string = '/api/conversations';

  private http = inject(HttpClient);
  private config = inject(Config);

  add(request: ConversationRequest) {
    return this.http.post<ApiResponse<Conversation>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(){
    return this.http.get<ApiResponse<Conversation[]>>(`${this.config.apiUrl}${this.baseUrl}`);
  }

  getById(id: number){
    return this.http.get<ApiResponse<Conversation>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }

  update(id: number, device: ConversationRequest){
    return this.http.put<ApiResponse<Conversation>>(`${this.config.apiUrl}${this.baseUrl}/${id}`, device);
  }

  delete(id: number){
    return this.http.delete<ApiResponse<Conversation>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }
}
