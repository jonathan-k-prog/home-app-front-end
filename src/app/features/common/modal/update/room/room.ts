import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Room} from '../../../../../core/room/room.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {RoomType} from '../../../../../core/room-type/room-type.enum';

@Component({
  selector: 'common-modal-update-room',
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
export class CommonModalUpdateRoomComponent {
  @Output() onSubmit: EventEmitter<Room> = new EventEmitter();

  protected form!: FormGroup;
  protected visible: boolean = false;
  private currentRoom: Room | null = null;
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
    });
  }

  public showModal(room: Room) {
    this.currentRoom = room;
    this.visible = true;

    const key = room.type;
    // @ts-ignore
    const type = RoomType[key as keyof typeof RoomType]

    this.form.patchValue({
      name: room.name,
      type: type,
    });
  }

  protected save() {
    if (!this.currentRoom) {
      return;
    }

    this.onSubmit.emit({
      ...this.currentRoom,
      name: this.form.value.name,
      type: this.form.value.type,
    });
    this.cancel();
  }

  protected cancel() {
    this.form.reset();
    this.currentRoom = null;
    this.visible = false;
  }

  protected isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched);
  }
}
