import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {WeatherStore} from '../../../../core/weather/weather.store';

@Component({
    selector: 'weather-actions',
    templateUrl: './actions.html',
    styleUrl: './actions.css',
    imports: [
        Button
    ]
})
export class Actions {
  protected weatherStore = inject(WeatherStore)

  protected refresh() {
    this.weatherStore.fetchWeather()
  }
}
