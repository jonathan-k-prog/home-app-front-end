import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Room, RoomRequest} from './room.model';
import {Config} from '../config';

@Injectable({ providedIn: 'root' })
export class RoomApi {
  private baseUrl: string = '/api/rooms';

  constructor(
    private http: HttpClient,
    private config: Config
  ) {}

  add(request: RoomRequest) {
    return this.http.post<ApiResponse<Room>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(){
    return this.http.get<ApiResponse<Room[]>>(`${this.config.apiUrl}${this.baseUrl}`);
  }

  update(id: number, request: RoomRequest){
    return this.http.put<ApiResponse<Room>>(`${this.config.apiUrl}${this.baseUrl}/${id}`, request);
  }

  delete(id: number){
    return this.http.delete<ApiResponse<Room>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }
}
