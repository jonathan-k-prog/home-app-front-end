import {Component, inject, input} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Card} from 'primeng/card';
import {Tag} from 'primeng/tag';
import {Divider} from 'primeng/divider';
import {Device} from '../../../../../core/device/device.model';
import {DateFormatter} from '../../../../../core/date/date.formatter';

@Component({
  selector: 'room-tracker-container-device-viewer',
  imports: [Card, Tag, Divider, DecimalPipe],
  templateUrl: './device-viewer.html',
  styleUrl: './device-viewer.css',
})
export class DeviceViewer {
  device = input<Device | null>(null)

  protected dateFormatter = inject(DateFormatter)
}
