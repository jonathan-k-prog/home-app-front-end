import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Weather} from './weather.model';
import {Config} from '../config';

@Injectable({ providedIn: 'root' })
export class WeatherApi {
  private baseUrl: string = '/api/weather';

  private http = inject(HttpClient);
  private config = inject(Config);

  fetch(){
    return this.http.get<ApiResponse<Weather>>(`${this.config.apiUrl}${this.baseUrl}`);
  }
}
