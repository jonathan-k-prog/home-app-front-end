import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { HomeDevicesCardComponent } from '../components/devices-card/devices-card';
import { HomeRoomsCardComponent } from '../components/rooms-card/rooms-card';
import { HomeWeatherCardComponent } from '../components/weather-card/weather-card';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-home',
  imports: [Button, HomeWeatherCardComponent, HomeRoomsCardComponent, HomeDevicesCardComponent, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {

}
