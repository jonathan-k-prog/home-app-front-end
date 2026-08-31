import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Properties } from './properties';
import { Device } from '../../../../core/device/device.model';
import { Room } from '../../../../core/room/room.model';
import { Home } from '../../../../core/home/home.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import { DeviceType } from '../../../../core/device-type/device-type.enum';

describe('Properties', () => {
  let component: Properties;
  let fixture: ComponentFixture<Properties>;

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
    name: 'Living Room Sensor',
    identifier: '00',
    connected: false,
    lastSeen: 1000,
    type: DeviceType.ESP_32_DHT11,
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Properties],
    }).compileComponents();

    fixture = TestBed.createComponent(Properties);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a placeholder when there is no selected device', () => {
    fixture.componentRef.setInput('selectedDevice', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No device selected');
  });

  it('renders the name and type of the selected device', () => {
    fixture.componentRef.setInput('selectedDevice', mockDevice);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Living Room Sensor');
    expect(fixture.nativeElement.textContent).toContain(DeviceType.ESP_32_DHT11);
  });
});
