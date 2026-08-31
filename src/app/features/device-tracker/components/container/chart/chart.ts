import {Component, inject, input, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {Device} from '../../../../../core/device/device.model';
import {UIChart} from 'primeng/chart';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'device-tracker-container-chart',
  imports: [
    UIChart
  ],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart implements OnInit, OnChanges {
  x = input<any[]>([]);
  y = input<any[]>([]);
  selectedDevice = input<Device | null>(null);

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['x'] || changes['y']) {
      console.log(changes['x']);
      this.initChart()
    }
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        labels: this.x,
        datasets: [
          {
            label: 'First Dataset',
            data: this.y,
            fill: false,
            borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
            tension: 0
          },
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    }
  }
}
