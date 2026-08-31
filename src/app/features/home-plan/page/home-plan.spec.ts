import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HomePlanPage } from './home-plan';
import { HomeStore } from '../../../core/home/home.store';
import { RoomStore } from '../../../core/room/room.store';
import { DeviceStore } from '../../../core/device/device.store';
import { Home } from '../../../core/home/home.model';
import { Room } from '../../../core/room/room.model';
import { Device } from '../../../core/device/device.model';
import { RoomType } from '../../../core/room-type/room-type.enum';
import { DeviceType } from '../../../core/device-type/device-type.enum';

describe('HomePlanPage', () => {
  let component: HomePlanPage;
  let fixture: ComponentFixture<HomePlanPage>;

  const mockHome: Home = { id: 1, name: 'Test Home', identifier: '00', timestamp: 1000 };

  const mockRoom: Room = {
    id: 1,
    name: 'Living room',
    type: RoomType.DEFAULT,
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    floor: 0,
    home: mockHome,
  };

  const mockDevice: Device = {
    id: 1,
    name: 'Sensor',
    identifier: '00',
    type: DeviceType.DEFAULT,
    connected: true,
    lastSeen: 0,
    averageTemperature: 0,
    minTemperatureReport: null,
    maxTemperatureReport: null,
    lastTemperatureReport: null,
    averageHumidity: 0,
    minHumidityReport: null,
    maxHumidityReport: null,
    lastHumidityReport: null,
    room: mockRoom,
  };

  let currentHomeSignal: ReturnType<typeof signal<Home | null>>;
  let roomsSignal: ReturnType<typeof signal<Room[]>>;
  let devicesSignal: ReturnType<typeof signal<Device[]>>;
  let loadRoomsByHomeIdSpy: ReturnType<typeof vi.fn>;
  let loadDevicesByHomeIdSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    currentHomeSignal = signal<Home | null>(mockHome);
    roomsSignal = signal<Room[]>([]);
    devicesSignal = signal<Device[]>([]);
    loadRoomsByHomeIdSpy = vi.fn();
    loadDevicesByHomeIdSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [HomePlanPage],
      providers: [
        MessageService,
        {
          provide: HomeStore,
          useValue: { current: currentHomeSignal },
        },
        {
          provide: RoomStore,
          useValue: {
            rooms: roomsSignal,
            loadRoomsByHomeId: loadRoomsByHomeIdSpy,
            addRoom: vi.fn(),
            updateRoom: vi.fn(),
          },
        },
        {
          provide: DeviceStore,
          useValue: {
            devices: devicesSignal,
            loadDevicesByHomeId: loadDevicesByHomeIdSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePlanPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the rooms and devices for the current home on init', () => {
    fixture.detectChanges();

    expect(loadRoomsByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
    expect(loadDevicesByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
  });

  it('does nothing on init when there is no current home', () => {
    currentHomeSignal.set(null);
    fixture.detectChanges();

    expect(loadRoomsByHomeIdSpy).not.toHaveBeenCalled();
    expect(loadDevicesByHomeIdSpy).not.toHaveBeenCalled();
  });

  it('renders the title and the rooms on the display', () => {
    roomsSignal.set([mockRoom]);
    devicesSignal.set([mockDevice]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Home Plan');
    expect(fixture.nativeElement.textContent).toContain('Living room');
  });
});
