import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RoomTrackerPage } from './room-tracker';
import { RoomStore } from '../../../core/room/room.store';
import { HomeStore } from '../../../core/home/home.store';
import { RoomTrackerStore } from '../room-tracker.store';
import { Home } from '../../../core/home/home.model';
import { Room } from '../../../core/room/room.model';
import { RoomType } from '../../../core/room-type/room-type.enum';
import { Device } from '../../../core/device/device.model';

describe('RoomTrackerPage', () => {
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

  let loadRoomsByHomeIdSpy: ReturnType<typeof vi.fn>;
  let roomsSignal: ReturnType<typeof signal<Room[]>>;
  let loadingRoomsSignal: ReturnType<typeof signal<boolean>>;
  let currentHomeSignal: ReturnType<typeof signal<Home | null>>;

  let selectedRoomSignal: ReturnType<typeof signal<Room | null>>;
  let selectedDevicesSignal: ReturnType<typeof signal<Device[]>>;
  let selectRoomSpy: ReturnType<typeof vi.fn>;
  let unselectRoomSpy: ReturnType<typeof vi.fn>;
  let refreshRoomSpy: ReturnType<typeof vi.fn>;
  let refreshDevicesSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loadRoomsByHomeIdSpy = vi.fn();
    roomsSignal = signal<Room[]>([]);
    loadingRoomsSignal = signal(false);
    currentHomeSignal = signal<Home | null>(mockHome);

    selectedRoomSignal = signal<Room | null>(null);
    selectedDevicesSignal = signal<Device[]>([]);
    selectRoomSpy = vi.fn();
    unselectRoomSpy = vi.fn();
    refreshRoomSpy = vi.fn();
    refreshDevicesSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [RoomTrackerPage],
      providers: [
        MessageService,
        {
          provide: RoomStore,
          useValue: {
            rooms: roomsSignal,
            loadingRooms: loadingRoomsSignal,
            loadRoomsByHomeId: loadRoomsByHomeIdSpy,
          },
        },
        {
          provide: HomeStore,
          useValue: {
            current: currentHomeSignal,
          },
        },
        {
          provide: RoomTrackerStore,
          useValue: {
            selectedRoom: selectedRoomSignal,
            selectedDevices: selectedDevicesSignal,
            selectRoom: selectRoomSpy,
            unselectRoom: unselectRoomSpy,
            refreshRoom: refreshRoomSpy,
            refreshDevices: refreshDevicesSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(RoomTrackerPage);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads the rooms for the current home on init', () => {
    const fixture = TestBed.createComponent(RoomTrackerPage);

    fixture.detectChanges();

    expect(loadRoomsByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
  });

  it('does not load rooms when there is no current home', () => {
    currentHomeSignal.set(null);
    const fixture = TestBed.createComponent(RoomTrackerPage);

    fixture.detectChanges();

    expect(loadRoomsByHomeIdSpy).not.toHaveBeenCalled();
  });

  it('shows a placeholder when there is no selected room', () => {
    const fixture = TestBed.createComponent(RoomTrackerPage);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No Room selected');
  });

  it('renders the selected room name once the store has it', () => {
    selectedRoomSignal.set(mockRoom);
    const fixture = TestBed.createComponent(RoomTrackerPage);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test Room');
  });
});
