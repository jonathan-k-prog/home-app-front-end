import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Device} from '../../../../../core/device/device.model';
import {Dialog} from 'primeng/dialog';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'common-modal-select-device',
  imports: [
    Dialog,
    Button,
    TableModule,
    Skeleton
  ],
  templateUrl: './device.html',
  styleUrl: './device.css',
})
export class CommonModalSelectDeviceComponent {
  @Input() devices: Device[] = [];
  @Input() loadingDevices: boolean = false;

  @Output() onSubmit: EventEmitter<Device> = new EventEmitter();

  protected visible: boolean = false;

  public showModal() {
    this.visible = true;
  }

  protected select(device: Device) {
    this.onSubmit.emit(device);
    this.visible = false;
  }

  protected cancel() {
    this.visible = false;
  }
}
