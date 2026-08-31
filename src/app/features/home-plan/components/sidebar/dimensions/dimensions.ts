import {Component, DestroyRef, effect, inject, model, OnInit} from '@angular/core';
import {Room} from '../../../../../core/room/room.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Message} from 'primeng/message';
import {Panel} from 'primeng/panel';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'home-plan-sidebar-dimensions',
  imports: [
    Message,
    Panel,
    ReactiveFormsModule,
    InputNumber
  ],
  templateUrl: './dimensions.html',
  styleUrl: './dimensions.css',
})
export class Dimensions implements OnInit {
  selectedRoom = model<Room | null>(null);

  protected form!: FormGroup;
  protected collapsed: boolean = true;

  private formBuilder = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const room = this.selectedRoom();
      if (room) {
        this.form?.patchValue({
          width: room.width,
          height: room.height,
        }, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      width: [1, Validators.required],
      height: [1, Validators.required],
    });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        const room = this.selectedRoom();
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
