import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RoomsManagerActionsComponent } from './actions.component';
import { RoomStore } from '../../../../core/room/room.store';
import { RoomRequest } from '../../../../core/room/room.model';
import { Home } from '../../../../core/home/home.model';
import { CommonModalAddRoomComponent } from '../../../common/modal/add/room/room';
import { RoomType } from '../../../../core/room-type/room-type.enum';

describe('RoomsManagerActionsComponent', () => {
  let component: RoomsManagerActionsComponent;
  let fixture: ComponentFixture<RoomsManagerActionsComponent>;

  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoomRequest: RoomRequest = {
    name: 'Living room',
    type: RoomType.DEFAULT,
    width: 25,
    height: 25,
    x: 0,
    y: 0,
    floor: 0,
    homeId: mockHome.id,
  };

  let addRoomSpy: ReturnType<typeof vi.fn>;
  let loadRoomsByHomeIdSpy: ReturnType<typeof vi.fn>;

  function clickButton(label: string) {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button'));
    const button = buttons.find((b) => b.textContent?.includes(label));
    button?.click();
  }

  beforeEach(async () => {
    addRoomSpy = vi.fn();
    loadRoomsByHomeIdSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [RoomsManagerActionsComponent],
      providers: [
        {
          provide: RoomStore,
          useValue: {
            addRoom: addRoomSpy,
            loadRoomsByHomeId: loadRoomsByHomeIdSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsManagerActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('opens the add modal with the current home', () => {
    fixture.componentRef.setInput('home', mockHome);
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddRoomComponent));
    const showModalSpy = vi.spyOn(addModal.componentInstance, 'showModal');

    clickButton('Add');

    expect(showModalSpy).toHaveBeenCalledExactlyOnceWith(mockHome);
  });

  it('does not open the add modal when there is no home', () => {
    fixture.componentRef.setInput('home', null);
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddRoomComponent));
    const showModalSpy = vi.spyOn(addModal.componentInstance, 'showModal');

    clickButton('Add');

    expect(showModalSpy).not.toHaveBeenCalled();
  });

  it('reloads the rooms for the current home on refresh', () => {
    fixture.componentRef.setInput('home', mockHome);
    fixture.detectChanges();

    clickButton('Refresh');

    expect(loadRoomsByHomeIdSpy).toHaveBeenCalledExactlyOnceWith(mockHome.id);
  });

  it('does nothing on refresh when there is no home', () => {
    fixture.componentRef.setInput('home', null);
    fixture.detectChanges();

    clickButton('Refresh');

    expect(loadRoomsByHomeIdSpy).not.toHaveBeenCalled();
  });

  it('forwards the add modal submission to the store', () => {
    fixture.detectChanges();

    const addModal = fixture.debugElement.query(By.directive(CommonModalAddRoomComponent));
    addModal.componentInstance.onSubmit.emit(mockRoomRequest);

    expect(addRoomSpy).toHaveBeenCalledExactlyOnceWith(mockRoomRequest);
  });
});
