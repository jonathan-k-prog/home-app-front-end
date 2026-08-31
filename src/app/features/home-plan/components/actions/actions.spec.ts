import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Actions } from './actions';
import { RoomStore } from '../../../../core/room/room.store';
import { Room, RoomRequest } from '../../../../core/room/room.model';
import { Home } from '../../../../core/home/home.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';
import { CommonModalAddRoomComponent } from '../../../common/modal/add/room/room';

describe('Actions', () => {
  let component: Actions;
  let fixture: ComponentFixture<Actions>;

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

  const mockRoomFloor2: Room = {
    id: 2,
    name: 'Attic',
    type: RoomType.DEFAULT,
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    floor: 2,
    home: mockHome,
  };

  const mockRoomRequest: RoomRequest = {
    name: 'New room',
    type: RoomType.DEFAULT,
    width: 25,
    height: 25,
    x: 0,
    y: 0,
    floor: 0,
    homeId: mockHome.id,
  };

  let addRoomSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    addRoomSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Actions],
      providers: [
        {
          provide: RoomStore,
          useValue: { addRoom: addRoomSpy },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Actions);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the add room modal with the current home', () => {
    fixture.componentRef.setInput('home', mockHome);
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddRoomComponent));
    const showModalSpy = vi.spyOn(addModal.componentInstance, 'showModal');

    (component as unknown as { addRoom(): void }).addRoom();

    expect(showModalSpy).toHaveBeenCalledExactlyOnceWith(mockHome);
  });

  it('does nothing when adding a room without a home', () => {
    fixture.componentRef.setInput('home', null);
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddRoomComponent));
    const showModalSpy = vi.spyOn(addModal.componentInstance, 'showModal');

    (component as unknown as { addRoom(): void }).addRoom();

    expect(showModalSpy).not.toHaveBeenCalled();
  });

  it('forwards the add modal submission to the store', () => {
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddRoomComponent));
    addModal.componentInstance.onSubmit.emit(mockRoomRequest);

    expect(addRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoomRequest);
  });

  it('moves to the next floor when one exists above', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0, mockRoomFloor2]);
    fixture.componentRef.setInput('floor', 0);
    fixture.detectChanges();

    (component as unknown as { nextFloor(): void }).nextFloor();

    expect(component.floor()).toBe(1);
  });

  it('does not go past the highest floor', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0, mockRoomFloor2]);
    fixture.componentRef.setInput('floor', 2);
    fixture.detectChanges();

    (component as unknown as { nextFloor(): void }).nextFloor();

    expect(component.floor()).toBe(2);
  });

  it('moves to the previous floor when one exists below', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0, mockRoomFloor2]);
    fixture.componentRef.setInput('floor', 2);
    fixture.detectChanges();

    (component as unknown as { previousFloor(): void }).previousFloor();

    expect(component.floor()).toBe(1);
  });

  it('does not go below the lowest floor', () => {
    fixture.componentRef.setInput('rooms', [mockRoomFloor0, mockRoomFloor2]);
    fixture.componentRef.setInput('floor', 0);
    fixture.detectChanges();

    (component as unknown as { previousFloor(): void }).previousFloor();

    expect(component.floor()).toBe(0);
  });

  it('zooms in up to the maximum', () => {
    fixture.componentRef.setInput('zoom', 15);
    fixture.detectChanges();

    (component as unknown as { zoomIn(): void }).zoomIn();

    expect(component.zoom()).toBe(15);
  });

  it('increases the zoom level', () => {
    fixture.componentRef.setInput('zoom', 10);
    fixture.detectChanges();

    (component as unknown as { zoomIn(): void }).zoomIn();

    expect(component.zoom()).toBe(11);
  });

  it('zooms out down to the minimum', () => {
    fixture.componentRef.setInput('zoom', 5);
    fixture.detectChanges();

    (component as unknown as { zoomOut(): void }).zoomOut();

    expect(component.zoom()).toBe(5);
  });

  it('decreases the zoom level', () => {
    fixture.componentRef.setInput('zoom', 10);
    fixture.detectChanges();

    (component as unknown as { zoomOut(): void }).zoomOut();

    expect(component.zoom()).toBe(9);
  });
});
