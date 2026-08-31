import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RoomStore } from '../../../../core/room/room.store';
import {Room, RoomRequest} from '../../../../core/room/room.model';
import { Home } from '../../../../core/home/home.model';
import { CommonModalAddDeviceComponent } from '../../../common/modal/add/device/device';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import {DevicesManagerActionsComponent} from './actions.component';
import {Device, DeviceRequest} from '../../../../core/device/device.model';
import {DeviceType} from '../../../../core/device-type/device-type.enum';
import {DeviceStore} from '../../../../core/device/device.store';

describe('DevicesManagerActionsComponent', () => {
  let component: DevicesManagerActionsComponent;
  let fixture: ComponentFixture<DevicesManagerActionsComponent>;

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

  const mockDeviceRequest: DeviceRequest = {
    name: 'Test Device',
    identifier: "00",
    connected: false,
    lastSeen: 1000,
    type: DeviceType.DEFAULT,
    roomId: mockRoom.id,
  };

  const mockRooms = [mockRoom];

  let addDeviceSpy: ReturnType<typeof vi.fn>;
  let loadRoomsByHomeIdSpy: ReturnType<typeof vi.fn>;
  let loadDevicesByHomeIdSpy: ReturnType<typeof vi.fn>;

  function clickButton(label: string) {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
    const button = buttons.find((b) => b.textContent?.includes(label));
    button?.click();
  }

  beforeEach(async () => {
    addDeviceSpy = vi.fn();
    loadRoomsByHomeIdSpy = vi.fn();
    loadDevicesByHomeIdSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [DevicesManagerActionsComponent],
      providers: [
        {
          provide: DeviceStore,
          useValue: {
            addDevice: addDeviceSpy,
            loadDevicesByHomeId: loadDevicesByHomeIdSpy,
          },
        },
        {
          provide: RoomStore,
          useValue: {
            loadRoomsByHomeId: loadRoomsByHomeIdSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesManagerActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the add modal with the current', () => {
    fixture.componentRef.setInput('home', mockHome);
    fixture.componentRef.setInput('rooms', mockRooms);
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddDeviceComponent));
    const showModalSpy = vi.spyOn(addModal.componentInstance, 'showModal');

    clickButton('Add');

    expect(showModalSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('reloads the homes for the current home on refresh', () => {
    fixture.componentRef.setInput('home', mockHome);
    fixture.componentRef.setInput('rooms', mockRooms);
    fixture.detectChanges();

    clickButton('Refresh');

    expect(loadDevicesByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
    expect(loadRoomsByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
  });

  it('does nothing on refresh when there is no home', () => {
    fixture.componentRef.setInput('home', null);
    fixture.componentRef.setInput('rooms', mockRooms);
    fixture.detectChanges();

    clickButton('Refresh');

    expect(loadDevicesByHomeIdSpy).not.toHaveBeenCalled();
    expect(loadRoomsByHomeIdSpy).not.toHaveBeenCalled();
  });

  it('forwards the add modal submission to the store', () => {
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddDeviceComponent));
    addModal.componentInstance.onSubmit.emit(mockDeviceRequest);

    expect(addDeviceSpy).toHaveBeenCalledExactlyOnceWith(mockDeviceRequest);
  });
});
