import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RoomsManagerPage } from './rooms-manager.page';
import {Home} from '../../../core/home/home.model';
import {Room} from '../../../core/room/room.model';
import {RoomType} from '../../../core/room-type/room-type.enum';
import {RoomStore} from '../../../core/room/room.store';
import {HomeStore} from '../../../core/home/home.store';

describe('RoomsManagerPage', () => {
  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoom: Room = {
    id: 0,
    name: 'Test',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    floor: 0,
    type: RoomType.DEFAULT,
    home: mockHome,
  };

  const mockRooms = [mockRoom];

  let loadRoomsByHomeIdSpy: ReturnType<typeof vi.fn>;
  let roomsSignal: ReturnType<typeof signal<Room[]>>;
  let loadingRoomsSignal: ReturnType<typeof signal<boolean>>;
  let currentHomeSignal: ReturnType<typeof signal<Home | null>>;

  beforeEach(async () => {
    loadRoomsByHomeIdSpy = vi.fn();
    roomsSignal = signal<Room []>([]);
    loadingRoomsSignal = signal(false);
    currentHomeSignal = signal<Home | null>(mockHome);

    await TestBed.configureTestingModule({
      imports: [RoomsManagerPage],
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
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(RoomsManagerPage);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('loads the rooms on init', () => {
    const fixture = TestBed.createComponent(RoomsManagerPage);

    fixture.detectChanges();

    expect(loadRoomsByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
  });

  it('shows a placeholder while there is no rooms data', () => {
    const fixture = TestBed.createComponent(RoomsManagerPage);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No rooms found.');
  });

  it('renders rooms data once the store has it', () => {
    const fixture = TestBed.createComponent(RoomsManagerPage);
    fixture.detectChanges();

    roomsSignal.set(mockRooms);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Test');
  });
});
