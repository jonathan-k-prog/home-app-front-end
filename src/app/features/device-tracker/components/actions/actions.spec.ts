import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Actions } from './actions';
import { DeviceTrackerStore } from '../../device-tracker.store';
import { CommonModalSelectDeviceComponent } from '../../../common/modal/select/device/device';
import { Device } from '../../../../core/device/device.model';
import { Room } from '../../../../core/room/room.model';
import { Home } from '../../../../core/home/home.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import { DeviceType } from '../../../../core/device-type/device-type.enum';

describe('Actions', () => {
  let component: Actions;
  let fixture: ComponentFixture<Actions>;

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

  let selectDeviceSpy: ReturnType<typeof vi.fn>;
  let unselectDeviceSpy: ReturnType<typeof vi.fn>;

  function clickButton(label: string) {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
    const button = buttons.find((b) => b.textContent?.includes(label));
    button?.click();
  }

  beforeEach(async () => {
    selectDeviceSpy = vi.fn();
    unselectDeviceSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Actions],
      providers: [
        {
          provide: DeviceTrackerStore,
          useValue: {
            selectDevice: selectDeviceSpy,
            unselectDevice: unselectDeviceSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Actions);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a Select button when there is no selected device', () => {
    fixture.componentRef.setInput('selectedDevice', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Select');
    expect(fixture.nativeElement.textContent).not.toContain('Unselect');
  });

  it('shows an Unselect button when a device is selected', () => {
    fixture.componentRef.setInput('selectedDevice', mockDevice);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Unselect');
  });

  it('opens the select modal', () => {
    fixture.componentRef.setInput('selectedDevice', null);
    fixture.detectChanges();

    const selectModal = fixture.debugElement.query(By.directive(CommonModalSelectDeviceComponent));
    const showModalSpy = vi.spyOn(selectModal.componentInstance, 'showModal');

    clickButton('Select');

    expect(showModalSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('unselects the device', () => {
    fixture.componentRef.setInput('selectedDevice', mockDevice);
    fixture.detectChanges();

    clickButton('Unselect');

    expect(unselectDeviceSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('unselects the device on refresh', () => {
    fixture.componentRef.setInput('selectedDevice', mockDevice);
    fixture.detectChanges();

    clickButton('Refresh');

    expect(unselectDeviceSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('forwards the select modal submission to the store', () => {
    fixture.detectChanges();

    const selectModal = fixture.debugElement.query(By.directive(CommonModalSelectDeviceComponent));
    selectModal.componentInstance.onSubmit.emit(mockDevice);

    expect(selectDeviceSpy).toHaveBeenCalledExactlyOnceWith(mockDevice);
  });
});
