import {Component, DestroyRef, effect, inject, model, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {Panel} from 'primeng/panel';
import {InputNumber} from 'primeng/inputnumber';
import {Room} from '../../../../../core/room/room.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Select} from 'primeng/select';
import {RoomType} from '../../../../../core/room-type/room-type.enum';

@Component({
  selector: 'home-plan-sidebar-properties',
  imports: [
    FormsModule,
    InputText,
    Message,
    Panel,
    ReactiveFormsModule,
    InputNumber,
    Select
  ],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties implements OnInit {
  selectedRoom = model<Room | null>(null);

  protected form!: FormGroup;
  protected collapsed: boolean = true;
  protected readonly roomTypeOptions = Object.values(RoomType)
    .filter((value): value is RoomType => typeof value === 'string')
    .map((value) => ({
      label: RoomType[value].replaceAll('_', ' '),
      value,
    }));


  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const room = this.selectedRoom();
      if (room) {
        this.form?.patchValue({
          name: room.name,
          type: room.type,
          floor: room.floor,
        }, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      floor: [0, Validators.required],
    });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        const room = this.selectedRoom();
        console.log(value)
        if (room) {
          this.selectedRoom.set({...room, ...value});
        }
      });
  }

  protected isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched);
  }
}
