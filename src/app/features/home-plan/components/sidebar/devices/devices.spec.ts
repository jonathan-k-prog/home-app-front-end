import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Devices } from './devices';
import { Device } from '../../../../../core/device/device.model';
import { Room } from '../../../../../core/room/room.model';
import { Home } from '../../../../../core/home/home.model';
import { RoomType } from '../../../../../core/room-type/room-type.enum';
import { DeviceType } from '../../../../../core/device-type/device-type.enum';

describe('Devices', () => {
  let component: Devices;
  let fixture: ComponentFixture<Devices>;

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

  const otherRoom: Room = { ...mockRoom, id: 2, name: 'Bedroom' };

  function mockDevice(id: number, room: Room): Device {
    return {
      id,
      name: `Device ${id}`,
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
      room,
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Devices],
    }).compileComponents();

    fixture = TestBed.createComponent(Devices);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows no devices when no room is selected', () => {
    fixture.componentRef.setInput('selectedRoom', null);
    fixture.componentRef.setInput('devices', [mockDevice(1, mockRoom)]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Device 1');
  });

  it('shows only the devices of the selected room', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.componentRef.setInput('devices', [mockDevice(1, mockRoom), mockDevice(2, otherRoom)]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Device 1');
    expect(fixture.nativeElement.textContent).not.toContain('Device 2');
  });
});
