import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Device, DeviceRequest} from './device.model';
import {Config} from '../config';

@Injectable({ providedIn: 'root' })
export class DeviceApi {
  private baseUrl: string = '/api/devices';

  private http = inject(HttpClient);
  private config = inject(Config);

  add(request: DeviceRequest){
    return this.http.post<ApiResponse<Device>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(connected: boolean | null, roomId: number | null, homeId: number | null){
    let params = new HttpParams();

    if (connected !== null) {
      params = params.set('connected', connected);
    }

    if (roomId !== null) {
      params = params.set('roomId', roomId);
    }

    if (homeId !== null) {
      params = params.set('homeId', homeId);
    }

    return this.http.get<ApiResponse<Device[]>>(`${this.config.apiUrl}${this.baseUrl}`, { params });
  }

  getById(id: number){
    return this.http.get<ApiResponse<Device>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }

  update(id: number, device: DeviceRequest){
    return this.http.put<ApiResponse<Device>>(`${this.config.apiUrl}${this.baseUrl}/${id}`, device);
  }

  delete(id: number){
    return this.http.delete<ApiResponse<Device>>(`${this.config.apiUrl}${this.baseUrl}/${id}`);
  }
}
