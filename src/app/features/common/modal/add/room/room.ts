import {Component, EventEmitter, Output} from '@angular/core';
import {Room} from '../../../../../core/room/room.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {RoomType} from '../../../../../core/room-type/room-type.enum';
import {Select} from 'primeng/select';

@Component({
  selector: 'common-modal-add-room',
  imports: [
    Dialog,
    ReactiveFormsModule,
    Message,
    Button,
    InputText,
    Select
  ],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class CommonModalAddRoomComponent {
  @Output() onSubmit: EventEmitter<Room> = new EventEmitter();

  protected form!: FormGroup;
  protected visible: boolean = false;
  protected readonly roomTypeOptions = Object.values(RoomType)
    .filter((value): value is RoomType => typeof value === 'number')
    .map((value) => ({
      label: RoomType[value].replaceAll('_', ' '),
      value,
    }));

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  public showModal() {
    this.visible = true;
    this.form.reset()
  }

  protected save() {
    this.onSubmit.emit({
      id: 0,
      name: this.form.value.name,
      type: this.form.value.type,
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
