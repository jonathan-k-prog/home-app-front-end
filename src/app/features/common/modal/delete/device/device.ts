import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Device} from '../../../../../core/device/device.model';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'common-modal-delete-device',
  imports: [
    Dialog,
    Button
  ],
  templateUrl: './device.html',
  styleUrl: './device.css',
})
export class CommonModalDeleteDeviceComponent {
  @Input() device: Device | null = null;
  @Output() onSubmit: EventEmitter<Device> = new EventEmitter();

  protected visible: boolean = false;

  public showModal(device: Device) {
    this.device = device;
    this.visible = true;
  }

  protected confirm() {
    if (!this.device) {
      return;
    }

    this.onSubmit.emit(this.device);
    this.cancel();
  }

  protected cancel() {
    this.device = null;
    this.visible = false;
  }
}
