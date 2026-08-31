import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../api-response/api-response.model';
import { RoomType } from '../room-type/room-type.enum';
import {Home} from '../home/home.model';
import {Room} from '../room/room.model';
import {Device} from './device.model';
import {DeviceType} from '../device-type/device-type.enum';
import {DeviceStore} from './device.store';

describe('DeviceStore', () => {
  let httpMock: HttpTestingController;

  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoom: Room = {
    id: 0,
    name: 'Test',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    floor: 0,
    type: RoomType.DEFAULT,
    home: mockHome,
  };

  const mockDevice: Device = {
    id: 0,
    name: 'Test',
    identifier: "00",
    connected: false,
    lastSeen: 1000,
    type: DeviceType.DEFAULT,
    averageHumidity: 0,
    averageTemperature: 0,
    lastHumidityReport: null,
    lastTemperatureReport: null,
    minTemperatureReport: null,
    minHumidityReport: null,
    maxTemperatureReport: null,
    maxHumidityReport: null,
    room: mockRoom,
  };

  const mockDevices = [mockDevice];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService],
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('starts with an empty state', () => {
    const store = TestBed.inject(DeviceStore);

    expect(store.devices()).toEqual([]);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('loads rooms on loadDevicesByHomeId success', () => {
    const store = TestBed.inject(DeviceStore);

    store.loadDevicesByHomeId(0);

    const req = httpMock.expectOne(r => r.url === '/api/devices');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('homeId')).toBe('0');

    req.flush({ status: 'OK', message: '', data: mockDevices, errors: '' } as ApiResponse<Device[]>);

    expect(store.devices()).toEqual(mockDevices);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('sets an error on loadDevicesByHomeId failure', () => {
    const store = TestBed.inject(DeviceStore);

    store.loadDevicesByHomeId(1);

    const req = httpMock.expectOne(r => r.url === '/api/devices');
    req.flush('fetch failed', { status: 500, statusText: 'Server Error' });

    expect(store.devices()).toEqual([]);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeTruthy();
  });

  it('resets to the initial state', () => {
    const store = TestBed.inject(DeviceStore);

    store.loadDevicesByHomeId(0);
    httpMock.expectOne(r => r.url === '/api/devices')
      .flush({ status: 'OK', message: '', data: mockDevices, errors: '' } as ApiResponse<Device[]>);

    store.reset();

    expect(store.devices()).toEqual([]);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeNull();
  });
});
