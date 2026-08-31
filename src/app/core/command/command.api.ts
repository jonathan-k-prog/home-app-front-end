import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Config} from '../config';
import {CommandRequest} from './command.model';

@Injectable({ providedIn: 'root' })
export class CommandApi {
  private baseUrl: string = '/api/commands';

  private http = inject(HttpClient);
  private config = inject(Config);

  send(request: CommandRequest) {
    return this.http.post<ApiResponse<null>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }
}
