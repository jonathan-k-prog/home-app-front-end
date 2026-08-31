import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DevicesManagerPage } from './devices-manager.page';
import {Home} from '../../../core/home/home.model';
import {Room} from '../../../core/room/room.model';
import {RoomType} from '../../../core/room-type/room-type.enum';
import {Device} from '../../../core/device/device.model';
import {DeviceType} from '../../../core/device-type/device-type.enum';
import {RoomStore} from '../../../core/room/room.store';
import {HomeStore} from '../../../core/home/home.store';
import {DeviceStore} from '../../../core/device/device.store';

describe('DevicesManagerPage', () => {
  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoom: Room = {
    id: 0,
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

  const mockRooms = [mockRoom];
  const mockDevices = [mockDevice];

  let loadRoomsByHomeIdSpy: ReturnType<typeof vi.fn>;
  let roomsSignal: ReturnType<typeof signal<Room[]>>;
  let loadingRoomsSignal: ReturnType<typeof signal<boolean>>;
  let loadDevicesByHomeIdSpy: ReturnType<typeof vi.fn>;
  let devicesSignal: ReturnType<typeof signal<Device[]>>;
  let loadingDevicesSignal: ReturnType<typeof signal<boolean>>;
  let currentHomeSignal: ReturnType<typeof signal<Home | null>>;

  beforeEach(async () => {
    loadRoomsByHomeIdSpy = vi.fn();
    roomsSignal = signal<Room []>([]);
    loadingRoomsSignal = signal(false);
    loadDevicesByHomeIdSpy = vi.fn();
    devicesSignal = signal<Device []>([]);
    loadingDevicesSignal = signal(false);
    currentHomeSignal = signal<Home | null>(mockHome);

    await TestBed.configureTestingModule({
      imports: [DevicesManagerPage],
      providers: [
        MessageService,
        {
          provide: DeviceStore,
          useValue: {
            devices: devicesSignal,
            loadingDevices: loadingDevicesSignal,
            loadDevicesByHomeId: loadDevicesByHomeIdSpy,
          }
        },
        {
          provide: RoomStore,
          useValue: {
            rooms: roomsSignal,
            loadingRooms: loadingRoomsSignal,
            loadRoomsByHomeId: loadRoomsByHomeIdSpy,
          },
        },
        {
          provide: HomeStore,
          useValue: {
            current: currentHomeSignal,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(DevicesManagerPage);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads the devices on init', () => {
    const fixture = TestBed.createComponent(DevicesManagerPage);

    fixture.detectChanges();

    expect(loadRoomsByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
  });

  it('shows a placeholder while there is no devices data', () => {
    const fixture = TestBed.createComponent(DevicesManagerPage);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No devices found.');
  });

  it('renders devices data once the store has it', () => {
    const fixture = TestBed.createComponent(DevicesManagerPage);
    fixture.detectChanges();

    roomsSignal.set(mockRooms);
    devicesSignal.set(mockDevices);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Device');
  });
});
