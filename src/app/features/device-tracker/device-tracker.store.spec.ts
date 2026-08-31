import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { RoomType } from '../../core/room-type/room-type.enum';
import { DeviceType } from '../../core/device-type/device-type.enum';
import { Home } from '../../core/home/home.model';
import { Room } from '../../core/room/room.model';
import { Device } from '../../core/device/device.model';
import { DeviceTrackerStore } from './device-tracker.store';

describe('DeviceTrackerStore', () => {
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
    const store = TestBed.inject(DeviceTrackerStore);

    expect(store.selectedDevice()).toBeNull();
    expect(store.loadingDevice()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('selects a device locally', () => {
    const store = TestBed.inject(DeviceTrackerStore);

    store.selectDevice(mockDevice);

    expect(store.selectedDevice()).toEqual(mockDevice);
  });

  it('unselects the current device', () => {
    const store = TestBed.inject(DeviceTrackerStore);

    store.selectDevice(mockDevice);
    store.unselectDevice();

    expect(store.selectedDevice()).toBeNull();
  });

  it('refreshes the selected device on success', () => {
    const store = TestBed.inject(DeviceTrackerStore);

    store.refreshDevice(mockDevice.id);

    const req = httpMock.expectOne(r => r.url === `/api/devices/${mockDevice.id}`);
    expect(req.request.method).toBe('GET');

    req.flush({ status: 'OK', message: '', data: mockDevice, errors: '' } as ApiResponse<Device>);

    expect(store.selectedDevice()).toEqual(mockDevice);
    expect(store.loadingDevice()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('sets an error when refreshing the device fails', () => {
    const store = TestBed.inject(DeviceTrackerStore);

    store.refreshDevice(mockDevice.id);

    const req = httpMock.expectOne(r => r.url === `/api/devices/${mockDevice.id}`);
    req.flush('fetch failed', { status: 500, statusText: 'Server Error' });

    expect(store.selectedDevice()).toBeNull();
    expect(store.loadingDevice()).toBe(false);
    expect(store.error()).toBeTruthy();
  });

  it('resets to the initial state', () => {
    const store = TestBed.inject(DeviceTrackerStore);

    store.selectDevice(mockDevice);
    store.reset();

    expect(store.selectedDevice()).toBeNull();
    expect(store.loadingDevice()).toBe(false);
    expect(store.error()).toBeNull();
  });
});
