import {Component, Input} from '@angular/core';
import {Device} from '../../../../core/device/device.model';

@Component({
  selector: 'device-tracker-properties',
  imports: [],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export class Properties {
  @Input() public device: Device | null = null;
}
