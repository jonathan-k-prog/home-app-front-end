import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Room, RoomRequest} from './room.model';
import {Config} from '../config';

@Injectable({ providedIn: 'root' })
export class RoomApi {
  private baseUrl: string = '/api/rooms';

  private http = inject(HttpClient);
  private config = inject(Config);

  add(request: RoomRequest) {
    return this.http.post<ApiResponse<Room>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(homeId: number | null){
    let params = new HttpParams();

    if (homeId !== null) {
      params = params.set('homeId', homeId);
    }

    return this.http.get<ApiResponse<Room[]>>(`${this.config.apiUrl}${this.baseUrl}`, { params });
  }


  getById(id: number){
    return this.http.get<ApiResponse<Room>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }

  update(id: number, request: RoomRequest){
    return this.http.put<ApiResponse<Room>>(`${this.config.apiUrl}${this.baseUrl}/${id}`, request);
  }

  delete(id: number){
    return this.http.delete<ApiResponse<Room>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }
}
