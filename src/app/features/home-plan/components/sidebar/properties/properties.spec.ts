import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Properties } from './properties';
import { Room } from '../../../../../core/room/room.model';
import { Home } from '../../../../../core/home/home.model';
import { RoomType } from '../../../../../core/room-type/room-type.enum';

describe('Properties', () => {
  let component: Properties;
  let fixture: ComponentFixture<Properties>;

  const mockHome: Home = { id: 1, name: 'Test Home', identifier: '00', timestamp: 1000 };

  const mockRoom: Room = {
    id: 1,
    name: 'Living room',
    type: RoomType.DEFAULT,
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    floor: 2,
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

  it('builds the room type options from the enum', () => {
    const properties = component as unknown as { roomTypeOptions: { label: string; value: RoomType }[] };
    expect(properties.roomTypeOptions).toEqual([{ label: 'DEFAULT', value: RoomType.DEFAULT }]);
  });

  it('patches the form with the selected room properties', async () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();
    await fixture.whenStable();

    const form = (component as unknown as { form: FormGroup }).form;
    expect(form.value).toEqual({ name: 'Living room', type: RoomType.DEFAULT, floor: 2 });
  });

  it('updates the selected room when the form changes', async () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();
    await fixture.whenStable();

    const form = (component as unknown as { form: FormGroup }).form;
    form.patchValue({ name: 'Bedroom', floor: 3 });

    expect(component.selectedRoom()).toEqual({ ...mockRoom, name: 'Bedroom', type: RoomType.DEFAULT, floor: 3 });
  });

  it('reports a touched invalid name as invalid', () => {
    fixture.detectChanges();

    const form = (component as unknown as { form: FormGroup }).form;
    form.get('name')?.markAsTouched();

    const properties = component as unknown as { isInvalid(name: string): boolean };
    expect(properties.isInvalid('name')).toBe(true);
  });

  it('does not report an untouched invalid name as invalid', () => {
    fixture.detectChanges();

    const properties = component as unknown as { isInvalid(name: string): boolean };
    expect(properties.isInvalid('name')).toBe(false);
  });
});
