import {Component, DestroyRef, effect, inject, model, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {Panel} from 'primeng/panel';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Room} from '../../../../../core/room/room.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'home-plan-sidebar-positions',
  imports: [
    InputText,
    Message,
    Panel,
    ReactiveFormsModule
  ],
  templateUrl: './positions.html',
  styleUrl: './positions.css',
})
export class Positions implements OnInit {
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
          x: room.x,
          y: room.y,
        }, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      x: [0],
      y: [0],
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
