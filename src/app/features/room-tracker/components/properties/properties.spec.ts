import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Properties } from './properties';
import { Home } from '../../../../core/home/home.model';
import { Room } from '../../../../core/room/room.model';
import { RoomType } from '../../../../core/room-type/room-type.enum';

describe('Properties', () => {
  let component: Properties;
  let fixture: ComponentFixture<Properties>;

  const mockHome: Home = {
    id: 0,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  const mockRoom: Room = {
    id: 1,
    name: 'Living Room',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    floor: 0,
    type: RoomType.DEFAULT,
    home: mockHome,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Properties],
    }).compileComponents();

    fixture = TestBed.createComponent(Properties);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a placeholder when there is no selected room', () => {
    fixture.componentRef.setInput('selectedRoom', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No Room selected');
  });

  it('shows the selected room name', () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Living Room');
  });
});
