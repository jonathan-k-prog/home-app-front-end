import {Component, input, Input} from '@angular/core';
import {Device} from '../../../../core/device/device.model';

@Component({
  selector: 'device-tracker-properties',
  imports: [],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties {
  selectedDevice = input<Device | null>(null);
}
