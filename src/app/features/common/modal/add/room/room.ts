import {Component, EventEmitter, inject, Output} from '@angular/core';
import {RoomRequest} from '../../../../../core/room/room.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {RoomType} from '../../../../../core/room-type/room-type.enum';
import {Select} from 'primeng/select';
import {Home} from '../../../../../core/home/home.model';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'common-modal-add-room',
  imports: [
    Dialog,
    ReactiveFormsModule,
    Message,
    Button,
    InputText,
    Select,
    InputNumber
  ],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class CommonModalAddRoomComponent {
  @Output() onSubmit: EventEmitter<RoomRequest> = new EventEmitter();

  private home!: Home;
  protected form!: FormGroup;
  protected visible: boolean = false;
  protected readonly roomTypeOptions = Object.values(RoomType)
    .filter((value): value is RoomType => typeof value === 'string')
    .map((value) => ({
      label: RoomType[value].replaceAll('_', ' '),
      value,
    }));

  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      floor: [0],
    });
  }

  public showModal(home: Home) {
    this.visible = true;
    this.home = home;
    this.form.reset();
  }

  protected save() {
    this.onSubmit.emit({
      name: this.form.value.name,
      type: this.form.value.type,
      width: 25,
      height: 25,
      x: 0,
      y: 0,
      floor: this.form.value.floor,
      homeId: this.home.id,
    });
    this.form.reset()
    this.visible = false;
  }

  protected cancel() {
    this.form.reset()
    this.visible = false;
  }

  protected isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched);
  }
}
