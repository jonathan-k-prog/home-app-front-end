import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Actions } from './actions';
import { RoomTrackerStore } from '../../room-tracker.store';
import { CommonModalSelectRoomComponent } from '../../../common/modal/select/room/room';
import { Home } from '../../../../core/home/home.model';
import { Room } from '../../../../core/room/room.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';

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

  const mockRooms = [mockRoom];

  let selectRoomSpy: ReturnType<typeof vi.fn>;
  let unselectRoomSpy: ReturnType<typeof vi.fn>;

  function clickButton(label: string) {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
    const button = buttons.find((b) => b.textContent?.includes(label));
    button?.click();
  }

  beforeEach(async () => {
    selectRoomSpy = vi.fn();
    unselectRoomSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Actions],
      providers: [
        {
          provide: RoomTrackerStore,
          useValue: {
            selectRoom: selectRoomSpy,
            unselectRoom: unselectRoomSpy,
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

  it('shows the select button and opens the modal when no room is selected', () => {
    fixture.componentRef.setInput('selectedRoom', null);
    fixture.componentRef.setInput('rooms', mockRooms);
    fixture.detectChanges();

    const selectModal = fixture.debugElement.query(By.directive(CommonModalSelectRoomComponent));
    const showModalSpy = vi.spyOn(selectModal.componentInstance, 'showModal');

    clickButton('Select');

    expect(showModalSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('shows the unselect button and unselects the room when one is selected', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.componentRef.setInput('rooms', mockRooms);
    fixture.detectChanges();

    clickButton('Unselect');

    expect(unselectRoomSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('forwards the select modal submission to the store', () => {
    fixture.detectChanges();

    const selectModal = fixture.debugElement.query(By.directive(CommonModalSelectRoomComponent));
    selectModal.componentInstance.onSubmit.emit(mockRoom);

    expect(selectRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoom);
  });
});
