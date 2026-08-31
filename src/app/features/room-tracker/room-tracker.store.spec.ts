import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { Home } from '../../core/home/home.model';
import { Room } from '../../core/room/room.model';
import { RoomType } from '../../core/room-type/room-type.enum';
import { Device } from '../../core/device/device.model';
import { DeviceType } from '../../core/device-type/device-type.enum';
import { RoomTrackerStore } from './room-tracker.store';

describe('RoomTrackerStore', () => {
  let httpMock: HttpTestingController;

  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoom: Room = {
    id: 1,
    name: 'Test Room',
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
    name: 'Test Device',
    identifier: '00',
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
    const store = TestBed.inject(RoomTrackerStore);

    expect(store.selectedRoom()).toBeNull();
    expect(store.loadingRoom()).toBe(false);
    expect(store.selectedDevices()).toEqual([]);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('selects a room locally', () => {
    const store = TestBed.inject(RoomTrackerStore);

    store.selectRoom(mockRoom);

    expect(store.selectedRoom()).toEqual(mockRoom);
  });

  it('unselects the current room', () => {
    const store = TestBed.inject(RoomTrackerStore);

    store.selectRoom(mockRoom);
    store.unselectRoom();

    expect(store.selectedRoom()).toBeNull();
  });

  it('refreshes the selected room on refreshRoom success', () => {
    const store = TestBed.inject(RoomTrackerStore);

    store.refreshRoom(mockRoom.id);

    const req = httpMock.expectOne(r => r.url === '/api/rooms/1');
    expect(req.request.method).toBe('GET');

    req.flush({ status: 'OK', message: '', data: mockRoom, errors: '' } as ApiResponse<Room>);

    expect(store.selectedRoom()).toEqual(mockRoom);
    expect(store.loadingRoom()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('sets an error on refreshRoom failure', () => {
    const store = TestBed.inject(RoomTrackerStore);

    store.refreshRoom(mockRoom.id);

    const req = httpMock.expectOne(r => r.url === '/api/rooms/1');
    req.flush('fetch failed', { status: 500, statusText: 'Server Error' });

    expect(store.selectedRoom()).toBeNull();
    expect(store.loadingRoom()).toBe(false);
    expect(store.error()).toBeTruthy();
  });

  it('refreshes the devices of the selected room on refreshDevices success', () => {
    const store = TestBed.inject(RoomTrackerStore);

    store.refreshDevices(mockRoom.id);

    const req = httpMock.expectOne(r => r.url === '/api/devices');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('roomId')).toBe('1');

    req.flush({ status: 'OK', message: '', data: mockDevices, errors: '' } as ApiResponse<Device[]>);

    expect(store.selectedDevices()).toEqual(mockDevices);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('sets an error on refreshDevices failure', () => {
    const store = TestBed.inject(RoomTrackerStore);

    store.refreshDevices(mockRoom.id);

    const req = httpMock.expectOne(r => r.url === '/api/devices');
    req.flush('fetch failed', { status: 500, statusText: 'Server Error' });

    expect(store.selectedDevices()).toEqual([]);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeTruthy();
  });

  it('resets to the initial state', () => {
    const store = TestBed.inject(RoomTrackerStore);

    store.selectRoom(mockRoom);
    store.refreshDevices(mockRoom.id);
    httpMock.expectOne(r => r.url === '/api/devices')
      .flush({ status: 'OK', message: '', data: mockDevices, errors: '' } as ApiResponse<Device[]>);

    store.reset();

    expect(store.selectedRoom()).toBeNull();
    expect(store.loadingRoom()).toBe(false);
    expect(store.selectedDevices()).toEqual([]);
    expect(store.loadingDevices()).toBe(false);
    expect(store.error()).toBeNull();
  });
});
