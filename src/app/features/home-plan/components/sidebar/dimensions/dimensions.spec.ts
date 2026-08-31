import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Dimensions } from './dimensions';
import { Room } from '../../../../../core/room/room.model';
import { Home } from '../../../../../core/home/home.model';
import { RoomType } from '../../../../../core/room-type/room-type.enum';

describe('Dimensions', () => {
  let component: Dimensions;
  let fixture: ComponentFixture<Dimensions>;

  const mockHome: Home = { id: 1, name: 'Test Home', identifier: '00', timestamp: 1000 };

  const mockRoom: Room = {
    id: 1,
    name: 'Living room',
    type: RoomType.DEFAULT,
    width: 12,
    height: 8,
    x: 0,
    y: 0,
    floor: 0,
    home: mockHome,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dimensions],
    }).compileComponents();

    fixture = TestBed.createComponent(Dimensions);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('patches the form with the selected room dimensions', async () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();
    await fixture.whenStable();

    const form = (component as unknown as { form: FormGroup }).form;
    expect(form.value).toEqual({ width: 12, height: 8 });
  });

  it('updates the selected room when the form changes', async () => {
    fixture.componentRef.setInput('selectedRoom', mockRoom);
    fixture.detectChanges();
    await fixture.whenStable();

    const form = (component as unknown as { form: FormGroup }).form;
    form.patchValue({ width: 20, height: 15 });

    expect(component.selectedRoom()).toEqual({ ...mockRoom, width: 20, height: 15 });
  });

  it('does not report an untouched invalid width as invalid', () => {
    fixture.detectChanges();

    const form = (component as unknown as { form: FormGroup }).form;
    form.get('width')?.setValue(null);

    const dimensions = component as unknown as { isInvalid(name: string): boolean };
    expect(dimensions.isInvalid('width')).toBe(false);
  });

  it('reports a touched invalid width as invalid', () => {
    fixture.detectChanges();

    const form = (component as unknown as { form: FormGroup }).form;
    form.get('width')?.setValue(null);
    form.get('width')?.markAsTouched();

    const dimensions = component as unknown as { isInvalid(name: string): boolean };
    expect(dimensions.isInvalid('width')).toBe(true);
  });
});
