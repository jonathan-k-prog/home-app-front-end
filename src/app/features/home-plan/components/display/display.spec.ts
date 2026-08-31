import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Display } from './display';
import { Room } from '../../../../core/room/room.model';
import { Device } from '../../../../core/device/device.model';
import { Home } from '../../../../core/home/home.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import { DeviceType } from '../../../../core/device-type/device-type.enum';

describe('Display', () => {
  let component: Display;
  let fixture: ComponentFixture<Display>;

  const mockHome: Home = {
    id: 1,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoomFloor0: Room = {
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

  const mockRoomFloor1: Room = {
    id: 2,
    name: 'Bedroom',
    type: RoomType.DEFAULT,
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    floor: 1,
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
    room: mockRoomFloor0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Display],
    }).compileComponents();

    fixture = TestBed.createComponent(Display);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows only the rooms on the current floor', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0, mockRoomFloor1]);
    fixture.componentRef.setInput('floor', 0);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Living room');
    expect(fixture.nativeElement.textContent).not.toContain('Bedroom');
  });

  it('counts the devices in each room', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0]);
    fixture.componentRef.setInput('devices', [mockDevice]);
    fixture.componentRef.setInput('floor', 0);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Devices : 1');
  });

  it('shows zero devices for a room with none', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0]);
    fixture.componentRef.setInput('devices', []);
    fixture.componentRef.setInput('floor', 0);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Devices : 0');
  });

  it('selects a room on click', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0]);
    fixture.componentRef.setInput('floor', 0);
    fixture.detectChanges();

    const roomElement = fixture.nativeElement.querySelector('.example-box') as HTMLElement;
    roomElement.click();
    fixture.detectChanges();

    expect(component.selectedRoom()).toEqual(mockRoomFloor0);
  });

  it('deselects a room when clicking it again', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0]);
    fixture.componentRef.setInput('floor', 0);
    fixture.componentRef.setInput('selectedRoom', mockRoomFloor0);
    fixture.detectChanges();

    const roomElement = fixture.nativeElement.querySelector('.example-box') as HTMLElement;
    roomElement.click();
    fixture.detectChanges();

    expect(component.selectedRoom()).toBeNull();
  });
});
