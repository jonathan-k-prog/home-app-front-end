import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidebar } from './sidebar';
import { RoomStore } from '../../../../core/room/room.store';
import { Room } from '../../../../core/room/room.model';
import { Home } from '../../../../core/home/home.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  const mockHome: Home = { id: 1, name: 'Test Home', identifier: '00', timestamp: 1000 };

  const mockRoom: Room = {
    id: 1,
    name: 'Living room',
    type: RoomType.DEFAULT,
    width: 10,
    height: 10,
    x: 20,
    y: 20,
    floor: 0,
    home: mockHome,
  };

  let updateRoomSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    updateRoomSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [{ provide: RoomStore, useValue: { updateRoom: updateRoomSpy } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a placeholder when there is no selected room', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No room selected');
  });

  it('moves the selected room up', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    (component as unknown as { moveUp(): void }).moveUp();

    expect(component.selectedRoom()?.y).toBe(10);
  });

  it('does not move above y = 0', () => {
    fixture.componentRef.setInput('selectedRoom', { ...mockRoom, y: 5 });
    fixture.detectChanges();

    (component as unknown as { moveUp(): void }).moveUp();

    expect(component.selectedRoom()?.y).toBe(0);
  });

  it('moves the selected room down', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    (component as unknown as { moveDown(): void }).moveDown();

    expect(component.selectedRoom()?.y).toBe(30);
  });

  it('moves the selected room left', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    (component as unknown as { moveLeft(): void }).moveLeft();

    expect(component.selectedRoom()?.x).toBe(10);
  });

  it('does not move left of x = 0', () => {
    fixture.componentRef.setInput('selectedRoom', { ...mockRoom, x: 5 });
    fixture.detectChanges();

    (component as unknown as { moveLeft(): void }).moveLeft();

    expect(component.selectedRoom()?.x).toBe(0);
  });

  it('moves the selected room right', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    (component as unknown as { moveRight(): void }).moveRight();

    expect(component.selectedRoom()?.x).toBe(30);
  });

  it('does nothing when moving without a selected room', () => {
    fixture.detectChanges();

    (component as unknown as { moveUp(): void }).moveUp();

    expect(component.selectedRoom()).toBeNull();
  });

  it('saves the selected room to the store', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    (component as unknown as { save(): void }).save();

    expect(updateRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoom);
  });

  it('does nothing on save without a selected room', () => {
    fixture.detectChanges();

    (component as unknown as { save(): void }).save();

    expect(updateRoomSpy).not.toHaveBeenCalled();
  });

  it('clears the selected room on cancel', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    (component as unknown as { cancel(): void }).cancel();

    expect(component.selectedRoom()).toBeNull();
  });
});
