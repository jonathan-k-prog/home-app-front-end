import {Component, inject} from '@angular/core';
import { Actions as WeatherActionsComponent } from '../components/actions/actions';
import {Toast} from 'primeng/toast';
import {Title} from '../components/title/title';
import {Dashboard} from '../components/dashboard/dashboard';
import {WeatherStore} from '../../../core/weather/weather.store';

@Component({
  selector: 'app-weather',
  imports: [
    Title,
    WeatherActionsComponent,
    Title,
    Toast,
    Title,
    Dashboard
  ],
  templateUrl: './weather.page.html',
  styleUrl: './weather.page.css',
})
export class WeatherPage {
  protected weatherStore = inject(WeatherStore)

  ngOnInit() {
    this.weatherStore.fetchWeather()
  }
}
