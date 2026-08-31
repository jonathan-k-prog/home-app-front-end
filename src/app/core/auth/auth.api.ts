import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { AuthSession } from './auth.model';
import {ApiResponse} from '../api-response/api-response.model';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private baseUrl = '/api/auth/google';

  private http = inject(HttpClient);
  private config = inject(Config);

  loginWithGoogle(credential: string) {
    return this.http.post<ApiResponse<AuthSession>>(`${this.config.apiUrl}${this.baseUrl}`, { idToken: credential });
  }
}
