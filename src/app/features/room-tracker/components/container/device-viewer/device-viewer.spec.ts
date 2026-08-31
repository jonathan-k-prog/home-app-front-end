import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceViewer } from './device-viewer';
import { Home } from '../../../../../core/home/home.model';
import { Room } from '../../../../../core/room/room.model';
import { RoomType } from '../../../../../core/room-type/room-type.enum';
import { Device } from '../../../../../core/device/device.model';
import { DeviceType } from '../../../../../core/device-type/device-type.enum';

describe('DeviceViewer', () => {
  let component: DeviceViewer;
  let fixture: ComponentFixture<DeviceViewer>;

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
    name: 'Living Room Sensor',
    identifier: '00',
    connected: true,
    lastSeen: 1000,
    type: DeviceType.ESP_32_DHT11,
    averageHumidity: 45.678,
    averageTemperature: 21.234,
    lastHumidityReport: { id: 1, value: 46, timestamp: 2000 },
    lastTemperatureReport: { id: 2, value: 22, timestamp: 2000 },
    minTemperatureReport: { id: 3, value: 18, timestamp: 3000 },
    minHumidityReport: { id: 4, value: 40, timestamp: 3000 },
    maxTemperatureReport: { id: 5, value: 25, timestamp: 4000 },
    maxHumidityReport: { id: 6, value: 50, timestamp: 4000 },
    room: mockRoom,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceViewer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the device name and a connected tag', () => {
    fixture.componentRef.setInput('device', mockDevice);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Living Room Sensor');
    expect(fixture.nativeElement.textContent).toContain('Connected');
    expect(fixture.nativeElement.textContent).not.toContain('Disconnected');
  });

  it('shows a disconnected tag when the device is offline', () => {
    fixture.componentRef.setInput('device', { ...mockDevice, connected: false });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Disconnected');
  });

  it('shows the average temperature and humidity', () => {
    fixture.componentRef.setInput('device', mockDevice);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('21.2°C');
    expect(fixture.nativeElement.textContent).toContain('45.7%');
  });

  it('falls back to a dash when there is no min/max/last report', () => {
    fixture.componentRef.setInput('device', {
      ...mockDevice,
      lastTemperatureReport: null,
      minTemperatureReport: null,
      maxTemperatureReport: null,
      lastHumidityReport: null,
      minHumidityReport: null,
      maxHumidityReport: null,
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('-°C');
    expect(fixture.nativeElement.textContent).toContain('-%');
  });
});
