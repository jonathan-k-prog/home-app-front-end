import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Positions } from './positions';
import { Room } from '../../../../../core/room/room.model';
import { Home } from '../../../../../core/home/home.model';
import { RoomType } from '../../../../../core/room-type/room-type.enum';

describe('Positions', () => {
  let component: Positions;
  let fixture: ComponentFixture<Positions>;

  const mockHome: Home = { id: 1, name: 'Test Home', identifier: '00', timestamp: 1000 };

  const mockRoom: Room = {
    id: 1,
    name: 'Living room',
    type: RoomType.DEFAULT,
    width: 10,
    height: 10,
    x: 5,
    y: 7,
    floor: 0,
    home: mockHome,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Positions],
    }).compileComponents();

    fixture = TestBed.createComponent(Positions);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts with a zeroed form', () => {
    fixture.detectChanges();

    const form = (component as unknown as { form: FormGroup }).form;
    expect(form.value).toEqual({ x: 0, y: 0 });
  });

  it('patches the form with the selected room position', async () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();
    await fixture.whenStable();

    const form = (component as unknown as { form: FormGroup }).form;
    expect(form.value).toEqual({ x: 5, y: 7 });
  });

  it('updates the selected room when the form changes', async () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();
    await fixture.whenStable();

    const form = (component as unknown as { form: FormGroup }).form;
    form.patchValue({ x: 10, y: 20 });

    expect(component.selectedRoom()).toEqual({ ...mockRoom, x: 10, y: 20 });
  });

  it('does not flag an untouched control as invalid', () => {
    fixture.detectChanges();

    const positions = component as unknown as { isInvalid(name: string): boolean };
    expect(positions.isInvalid('x')).toBe(false);
  });
});
