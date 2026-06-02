import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { AuthSession } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private baseUrl = '/api/auth';

  constructor(
    private http: HttpClient,
    private config: Config,
  ) {}

  loginWithGoogle(credential: string) {
    return this.http.post<AuthSession>(`${this.config.apiUrl}${this.baseUrl}/google`, { credential });
  }
}
