import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Config} from '../config';
import {Notification, NotificationRequest} from './notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationApi {
  private baseUrl: string = '/api/notifications';

  private http = inject(HttpClient);
  private config = inject(Config);

  add(request: NotificationRequest) {
    return this.http.post<ApiResponse<Notification>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(){
    return this.http.get<ApiResponse<Notification[]>>(`${this.config.apiUrl}${this.baseUrl}`);
  }

  update(id: number, request: NotificationRequest){
    return this.http.put<ApiResponse<Notification>>(`${this.config.apiUrl}${this.baseUrl}/${id}`, request);
  }

  delete(id: number){
    return this.http.delete<ApiResponse<Notification>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }
}
