import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DeviceTrackerPage } from './device-tracker';
import { Home } from '../../../core/home/home.model';
import { Room } from '../../../core/room/room.model';
import { RoomType } from '../../../core/room-type/room-type.enum';
import { Device } from '../../../core/device/device.model';
import { DeviceType } from '../../../core/device-type/device-type.enum';
import { DeviceStore } from '../../../core/device/device.store';
import { RoomStore } from '../../../core/room/room.store';
import { HomeStore } from '../../../core/home/home.store';
import { DeviceTrackerStore } from '../device-tracker.store';

describe('DeviceTrackerPage', () => {
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

  let loadDevicesByHomeIdSpy: ReturnType<typeof vi.fn>;
  let devicesSignal: ReturnType<typeof signal<Device[]>>;
  let loadingDevicesSignal: ReturnType<typeof signal<boolean>>;
  let currentHomeSignal: ReturnType<typeof signal<Home | null>>;
  let selectedDeviceSignal: ReturnType<typeof signal<Device | null>>;

  beforeEach(async () => {
    loadDevicesByHomeIdSpy = vi.fn();
    devicesSignal = signal<Device[]>([]);
    loadingDevicesSignal = signal(false);
    currentHomeSignal = signal<Home | null>(mockHome);
    selectedDeviceSignal = signal<Device | null>(null);

    await TestBed.configureTestingModule({
      imports: [DeviceTrackerPage],
      providers: [
        MessageService,
        {
          provide: DeviceStore,
          useValue: {
            devices: devicesSignal,
            loadingDevices: loadingDevicesSignal,
            loadDevicesByHomeId: loadDevicesByHomeIdSpy,
          },
        },
        {
          provide: RoomStore,
          useValue: {},
        },
        {
          provide: HomeStore,
          useValue: {
            current: currentHomeSignal,
          },
        },
        {
          provide: DeviceTrackerStore,
          useValue: {
            selectedDevice: selectedDeviceSignal,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(DeviceTrackerPage);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads the devices for the current home on init', () => {
    const fixture = TestBed.createComponent(DeviceTrackerPage);

    fixture.detectChanges();

    expect(loadDevicesByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
  });

  it('does not load devices when there is no current home', () => {
    currentHomeSignal.set(null);
    const fixture = TestBed.createComponent(DeviceTrackerPage);

    fixture.detectChanges();

    expect(loadDevicesByHomeIdSpy).not.toHaveBeenCalled();
  });

  it('shows a placeholder while there is no device selected', () => {
    const fixture = TestBed.createComponent(DeviceTrackerPage);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No device selected');
  });

  it('renders the selected device data once the store has it', () => {
    const fixture = TestBed.createComponent(DeviceTrackerPage);
    fixture.detectChanges();

    selectedDeviceSignal.set(mockDevice);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Device');
  });
});
