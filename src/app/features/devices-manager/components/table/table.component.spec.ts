/*
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesManagerTableComponent } from './table';

describe('DevicesManagerTableComponent', () => {
  let component: DevicesManagerTableComponent;
  let fixture: ComponentFixture<DevicesManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesManagerTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesManagerTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {DevicesManagerTableComponent} from './table.component';
import { Room } from '../../../../core/room/room.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import { Home } from '../../../../core/home/home.model';
import { CommonModalUpdateDeviceComponent } from '../../../common/modal/update/device/device';
import { CommonModalDeleteDeviceComponent } from '../../../common/modal/delete/device/device';
import {Device} from '../../../../core/device/device.model';
import {DeviceType} from '../../../../core/device-type/device-type.enum';
import {DeviceStore} from '../../../../core/device/device.store';
import {MessageService} from 'primeng/api';

describe('DevicesManagerTableComponent', () => {
  let component: DevicesManagerTableComponent;
  let fixture: ComponentFixture<DevicesManagerTableComponent>;

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

  let updateDeviceSpy: ReturnType<typeof vi.fn>;
  let deleteDeviceSpy: ReturnType<typeof vi.fn>;
  let navigateSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    updateDeviceSpy = vi.fn();
    deleteDeviceSpy = vi.fn();
    navigateSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [DevicesManagerTableComponent],
      providers: [
        {
          provide: MessageService,
        },
        {
          provide: DeviceStore,
          useValue: {
            updateDevice: updateDeviceSpy,
            deleteDevice: deleteDeviceSpy,
          },
        },
       /* {
          provide: Router,
          useValue: { navigate: navigateSpy },
        },*/
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesManagerTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a placeholder when there are no devices', () => {
    fixture.componentRef.setInput('devices', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No devices found.');
  });

  it('renders a row per device', () => {
    fixture.componentRef.setInput('devices', mockDevices);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Device');
  });

/*  it('navigates to the room tracker', () => {
    (component as unknown as { track(room: Room): void }).track(mockRoom);

    expect(navigateSpy).toHaveBeenCalledExactlyOnceWith(['/room-tracker']);
  });*/

  it('forwards the update modal submission to the store', () => {
    fixture.detectChanges();

    const updateModal = fixture.debugElement.query(By.directive(CommonModalUpdateDeviceComponent));
    updateModal.componentInstance.onSubmit.emit(mockDevice);

    expect(updateDeviceSpy).toHaveBeenCalledExactlyOnceWith(mockDevice);
  });

  it('forwards the delete modal submission to the store', () => {
    fixture.detectChanges();

    const deleteModal = fixture.debugElement.query(By.directive(CommonModalDeleteDeviceComponent));
    deleteModal.componentInstance.onSubmit.emit(mockDevice);

    expect(deleteDeviceSpy).toHaveBeenCalledExactlyOnceWith(mockDevice);
  });
});
