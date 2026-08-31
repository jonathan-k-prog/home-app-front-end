import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Container } from './container';
import { RoomTrackerStore } from '../../room-tracker.store';
import { Home } from '../../../../core/home/home.model';
import { Room } from '../../../../core/room/room.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import { Device } from '../../../../core/device/device.model';
import { DeviceType } from '../../../../core/device-type/device-type.enum';

describe('Container', () => {
  let component: Container;
  let fixture: ComponentFixture<Container>;

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
    connected: true,
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

  let refreshRoomSpy: ReturnType<typeof vi.fn>;
  let refreshDevicesSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    refreshRoomSpy = vi.fn();
    refreshDevicesSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Container],
      providers: [
        {
          provide: RoomTrackerStore,
          useValue: {
            refreshRoom: refreshRoomSpy,
            refreshDevices: refreshDevicesSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Container);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows nothing when there is no selected room', () => {
    fixture.componentRef.setInput('selectedRoom', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p-card')).toBeNull();
  });

  it('renders a device viewer per device once a room is selected', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.componentRef.setInput('devices', [mockDevice]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Device');
  });

  it('refreshes the room and its devices when the selected room changes', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    expect(refreshRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoom.id);
    expect(refreshDevicesSpy).toHaveBeenCalledExactlyOnceWith(mockRoom.id);
  });

  it('does not refresh when the selected room changes to null', () => {
    fixture.componentRef.setInput('selectedRoom', null);
    fixture.detectChanges();

    expect(refreshRoomSpy).not.toHaveBeenCalled();
    expect(refreshDevicesSpy).not.toHaveBeenCalled();
  });

  it('periodically refreshes the selected room and its devices', () => {
    vi.useFakeTimers();

    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    refreshRoomSpy.mockClear();
    refreshDevicesSpy.mockClear();

    vi.advanceTimersByTime(5000);

    expect(refreshRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoom.id);
    expect(refreshDevicesSpy).toHaveBeenCalledExactlyOnceWith(mockRoom.id);
  });

  it('does not refresh on interval once destroyed', () => {
    vi.useFakeTimers();

    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    refreshRoomSpy.mockClear();
    refreshDevicesSpy.mockClear();

    fixture.destroy();
    vi.advanceTimersByTime(5000);

    expect(refreshRoomSpy).not.toHaveBeenCalled();
    expect(refreshDevicesSpy).not.toHaveBeenCalled();
  });
});
