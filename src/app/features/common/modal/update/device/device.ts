import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Device} from '../../../../../core/device/device.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {Message} from 'primeng/message';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Room} from '../../../../../core/room/room.model';
import {DeviceType} from '../../../../../core/device-type/device-type.enum';

@Component({
  selector: 'common-modal-update-device',
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
export class CommonModalUpdateDeviceComponent {
  @Input() rooms: Room[] = [];
  @Input() loadingRooms: boolean = false;
  @Output() onSubmit: EventEmitter<Device> = new EventEmitter();

  protected form!: FormGroup;
  protected visible: boolean = false;
  private currentDevice: Device | null = null;
  protected readonly deviceTypeOptions = Object.values(DeviceType)
    .filter((value): value is DeviceType => typeof value === 'number')
    .map((value) => ({
      label: DeviceType[value].replaceAll('_', ' '),
      value,
    }));

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      roomId: [Validators.required],
    });
  }

  public showModal(device: Device) {
    this.currentDevice = device;
    this.visible = true;

    const key = device.type;
    // @ts-ignore
    const type = DeviceType[key as keyof typeof DeviceType]

    this.form.patchValue({
      name: device.name,
      type: type,
      roomId: device.room.id,
    });
  }

  protected save() {
    if (!this.currentDevice) {
      return;
    }

    const room = this.rooms.find(tmp => tmp.id === this.form.value.roomId)

    if(room){
      this.onSubmit.emit({
        ...this.currentDevice,
        name: this.form.value.name,
        type: this.form.value.type,
        room: room,
      });
      this.cancel()
    }
  }

  protected cancel() {
    this.form.reset();
    this.currentDevice = null;
    this.visible = false;
  }

  protected isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }

  protected readonly DeviceType = DeviceType;
}
