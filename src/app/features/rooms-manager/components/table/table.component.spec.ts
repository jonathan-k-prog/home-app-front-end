import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoomsManagerTableComponent } from './table.component';
import { RoomStore } from '../../../../core/room/room.store';
import { Room } from '../../../../core/room/room.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import { Home } from '../../../../core/home/home.model';
import { CommonModalUpdateRoomComponent } from '../../../common/modal/update/room/room';
import { CommonModalDeleteRoomComponent } from '../../../common/modal/delete/room/room';

describe('RoomsManagerTableComponent', () => {
  let component: RoomsManagerTableComponent;
  let fixture: ComponentFixture<RoomsManagerTableComponent>;

  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoom: Room = {
    id: 0,
    name: 'Living room',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    floor: 0,
    type: RoomType.DEFAULT,
    home: mockHome,
  };

  let updateRoomSpy: ReturnType<typeof vi.fn>;
  let deleteRoomSpy: ReturnType<typeof vi.fn>;
  let navigateSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    updateRoomSpy = vi.fn();
    deleteRoomSpy = vi.fn();
    navigateSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [RoomsManagerTableComponent],
      providers: [
        {
          provide: RoomStore,
          useValue: {
            updateRoom: updateRoomSpy,
            deleteRoom: deleteRoomSpy,
          },
        },
        {
          provide: Router,
          useValue: { navigate: navigateSpy },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsManagerTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a placeholder when there are no rooms', () => {
    fixture.componentRef.setInput('rooms', []);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No rooms found.');
  });

  it('renders a row per room', () => {
    fixture.componentRef.setInput('rooms', [mockRoom]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Living room');
  });

  it('navigates to the room tracker', () => {
    (component as unknown as { track(room: Room): void }).track(mockRoom);

    expect(navigateSpy).toHaveBeenCalledExactlyOnceWith(['/room-tracker']);
  });

  it('forwards the update modal submission to the store', () => {
    fixture.detectChanges();

    const updateModal = fixture.debugElement.query(By.directive(CommonModalUpdateRoomComponent));
    updateModal.componentInstance.onSubmit.emit(mockRoom);

    expect(updateRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoom);
  });

  it('forwards the delete modal submission to the store', () => {
    fixture.detectChanges();

    const deleteModal = fixture.debugElement.query(By.directive(CommonModalDeleteRoomComponent));
    deleteModal.componentInstance.onSubmit.emit(mockRoom);

    expect(deleteRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoom);
  });
});
