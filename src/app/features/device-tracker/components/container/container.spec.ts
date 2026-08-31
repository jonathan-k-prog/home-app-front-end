import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Container } from './container';
import { DeviceTrackerStore } from '../../device-tracker.store';
import { Device } from '../../../../core/device/device.model';
import { Room } from '../../../../core/room/room.model';
import { Home } from '../../../../core/home/home.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
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
    id: 1,
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

  let refreshDeviceSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    refreshDeviceSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Container],
      providers: [
        {
          provide: DeviceTrackerStore,
          useValue: {
            refreshDevice: refreshDeviceSpy,
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

  it('shows nothing when there is no selected device', () => {
    fixture.componentRef.setInput('selectedDevice', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('p-card')).toBeNull();
  });

  it('shows a card once a device is selected', () => {
    fixture.componentRef.setInput('selectedDevice', mockDevice);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Humidity');
  });

  it('refreshes the selected device every 5 seconds', () => {
    vi.useFakeTimers();
    fixture.componentRef.setInput('selectedDevice', mockDevice);
    fixture.detectChanges();

    vi.advanceTimersByTime(5000);
    expect(refreshDeviceSpy).toHaveBeenCalledExactlyOnceWith(mockDevice.id);

    vi.advanceTimersByTime(5000);
    expect(refreshDeviceSpy).toHaveBeenCalledTimes(2);
  });

  it('does not refresh when there is no selected device', () => {
    vi.useFakeTimers();
    fixture.componentRef.setInput('selectedDevice', null);
    fixture.detectChanges();

    vi.advanceTimersByTime(5000);

    expect(refreshDeviceSpy).not.toHaveBeenCalled();
  });

  it('stops refreshing after the component is destroyed', () => {
    vi.useFakeTimers();
    fixture.componentRef.setInput('selectedDevice', mockDevice);
    fixture.detectChanges();

    fixture.destroy();
    vi.advanceTimersByTime(10000);

    expect(refreshDeviceSpy).not.toHaveBeenCalled();
  });
});
