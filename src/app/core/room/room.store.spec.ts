import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../api-response/api-response.model';
import { Room } from './room.model';
import { RoomType } from '../room-type/room-type.enum';
import { Home } from '../home/home.model';
import { RoomStore } from './room.store';

describe('RoomStore', () => {
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

  const mockRooms = [mockRoom];

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
    const store = TestBed.inject(RoomStore);

    expect(store.rooms()).toEqual([]);
    expect(store.loadingRooms()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('loads rooms on loadRoomsByHomeId success', () => {
    const store = TestBed.inject(RoomStore);

    store.loadRoomsByHomeId(0);

    const req = httpMock.expectOne(r => r.url === '/api/rooms');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('homeId')).toBe('0');

    req.flush({ status: 'OK', message: '', data: mockRooms, errors: '' } as ApiResponse<Room[]>);

    expect(store.rooms()).toEqual(mockRooms);
    expect(store.loadingRooms()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('sets an error on loadRoomsByHomeId failure', () => {
    const store = TestBed.inject(RoomStore);

    store.loadRoomsByHomeId(1);

    const req = httpMock.expectOne(r => r.url === '/api/rooms');
    req.flush('fetch failed', { status: 500, statusText: 'Server Error' });

    expect(store.rooms()).toEqual([]);
    expect(store.loadingRooms()).toBe(false);
    expect(store.error()).toBeTruthy();
  });

  it('resets to the initial state', () => {
    const store = TestBed.inject(RoomStore);

    store.loadRoomsByHomeId(0);
    httpMock.expectOne(r => r.url === '/api/rooms')
      .flush({ status: 'OK', message: '', data: mockRooms, errors: '' } as ApiResponse<Room[]>);

    store.reset();

    expect(store.rooms()).toEqual([]);
    expect(store.loadingRooms()).toBe(false);
    expect(store.error()).toBeNull();
  });
});
