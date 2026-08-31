import {Component, inject, input} from '@angular/core';
import { Weather } from '../../../../core/weather/weather.model';
import {Card} from 'primeng/card';
import {DateFormatter} from '../../../../core/date/date.formatter';

@Component({
  selector: 'weather-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [
    Card
  ]
})
export class Dashboard {
  public weather = input<Weather | null>(null);
  public loadingWeather = input<boolean>(false);

  private dateFormatter = inject(DateFormatter);
  
  protected getTime() {
    return this.dateFormatter.toString(new Date().getTime());
  }
}
