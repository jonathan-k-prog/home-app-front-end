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
  @Input() rooms: Room[] = [];
  @Input() loadingRooms: boolean = false;
  @Output() onSubmit: EventEmitter<Device> = new EventEmitter();

  protected form!: FormGroup;
  protected visible: boolean = false;
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

  public showModal() {
    this.visible = true;
    this.form.reset();
  }

  protected save() {
    const room = this.rooms.find(tmp => tmp.id === this.form.value.roomId)

    if(room){
      this.onSubmit.emit({
        id: 0,
        name: this.form.value.name,
        type: this.form.value.type,
        room: room,
        temperatureReports: [],
        humidityReports: []
      });
      this.form.reset();
      this.visible = false;
    }
  }

  protected cancel() {
    this.form.reset();
    this.visible = false;
  }

  protected isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control.touched;
  }
}
