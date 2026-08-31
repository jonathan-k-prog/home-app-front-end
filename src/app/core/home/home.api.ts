import {inject, Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Config} from '../config';
import {Home, HomeRequest} from './home.model';

@Injectable({ providedIn: 'root' })
export class HomeApi {
  private baseUrl: string = '/api/homes';

  private http = inject(HttpClient);
  private config = inject(Config);

  add(request: HomeRequest){
    return this.http.post<ApiResponse<Home>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(){
    return this.http.get<ApiResponse<Home[]>>(`${this.config.apiUrl}${this.baseUrl}`);
  }

  getById(id: number){
    return this.http.get<ApiResponse<Home>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }

  update(id: number, home: HomeRequest){
    return this.http.put<ApiResponse<Home>>(`${this.config.apiUrl}${this.baseUrl}/${id}`, home);
  }

  delete(id: number){
    return this.http.delete<ApiResponse<Home>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }
}
