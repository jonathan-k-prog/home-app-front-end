import {Component, effect, EventEmitter, inject, input, Input, Output} from '@angular/core';
import {Device, DeviceRequest} from '../../../../../core/device/device.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Room} from '../../../../../core/room/room.model';
import {DeviceType} from '../../../../../core/device-type/device-type.enum';

@Component({
  selector: 'common-modal-add-device',
  imports: [
    Dialog,
    ReactiveFormsModule,
    Message,
    Button,
    InputText,
    Select
  ],
  templateUrl: './device.html',
  styleUrl: './device.css',
})
export class CommonModalAddDeviceComponent {
  devices = input<Device[]>([]);
  loadingDevices = input<boolean>(false);
  rooms = input<Room[]>([]);
  loadingRooms = input<boolean>(false);

  @Output() onSubmit: EventEmitter<DeviceRequest> = new EventEmitter();

  protected form!: FormGroup;
  protected visible: boolean = false;
  protected readonly deviceTypeOptions = Object.values(DeviceType)
    .filter((value): value is DeviceType => typeof value === 'string')
    .map((value) => ({
      label: DeviceType[value].replaceAll('_', ' '),
      value,
    }));

  private formBuilder = inject(FormBuilder)

  constructor() {
    effect(() => {
      this.devices();
      this.form?.get('identifier')?.updateValueAndValidity({onlySelf: true});
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      identifier: ['', Validators.required, this.uniqueIdentifierValidator()],
      type: ['', Validators.required],
      roomId: [Validators.required],
    });
  }

  public showModal() {
    this.visible = true;
    this.form.reset();
  }

  protected save() {
    const room = this.rooms().find(tmp => tmp.id === this.form.value.roomId)

    if(room){
      this.onSubmit.emit({
        name: this.form.value.name,
        identifier: this.form.value.identifier,
        type: this.form.value.type,
        connected: false,
        lastSeen: Date.now(),
        roomId: room.id,
      });
      this.form.reset();
      this.visible = false;
    }
  }

  protected cancel() {
    this.form.reset();
    this.visible = false;
  }

  private uniqueIdentifierValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const taken = this.devices()?.some(d => d.identifier === control.value);
      return taken ? { notUnique: true } : null;
    };
  }

  protected isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched);
  }

  protected hasError(controlName: string, error: string) {
    return this.form.get(controlName)?.hasError(error) && this.form.get(controlName)?.touched;
  }
}
