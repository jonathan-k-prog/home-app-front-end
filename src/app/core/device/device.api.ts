import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../api-response/api-response.model';
import {Device, DeviceRequest} from './device.model';
import {Config} from '../config';

@Injectable({ providedIn: 'root' })
export class DeviceApi {
  private baseUrl: string = '/api/devices';

  constructor(
    private http: HttpClient,
    private config: Config,
  ) {}

  add(request: DeviceRequest){
    return this.http.post<ApiResponse<Device>>(`${this.config.apiUrl}${this.baseUrl}`, request);
  }

  getAll(){
    return this.http.get<ApiResponse<Device[]>>(`${this.config.apiUrl}${this.baseUrl}`);
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
