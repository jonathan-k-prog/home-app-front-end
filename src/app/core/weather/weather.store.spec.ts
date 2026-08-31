import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { WeatherStore } from './weather.store';
import { Weather } from './weather.model';
import { ApiResponse } from '../api-response/api-response.model';

describe('WeatherStore', () => {
  let httpMock: HttpTestingController;

  const mockWeather: Weather = {
    temperature: 21,
    windSpeed: 12,
    windDirection: 'NW',
    windDirectionDegree: 315,
    precipitation: 0,
    pressure: 1013,
    rainChance: 10,
    snowChance: 0,
    uv: 4,
    humidity: 55,
    cloud: 20,
    condition: 'Sunny',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService],
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('starts with an empty state', () => {
    const store = TestBed.inject(WeatherStore);

    expect(store.weather()).toBeNull();
    expect(store.loadingWeather()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('loads the weather on fetchWeather success', () => {
    const store = TestBed.inject(WeatherStore);

    store.fetchWeather();

    const req = httpMock.expectOne('/api/weather');
    expect(req.request.method).toBe('GET');

    req.flush({ status: 'OK', message: '', data: mockWeather, errors: '' } as ApiResponse<Weather>);

    expect(store.weather()).toEqual(mockWeather);
    expect(store.loadingWeather()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('sets an error on fetchWeather failure', () => {
    const store = TestBed.inject(WeatherStore);

    store.fetchWeather();

    const req = httpMock.expectOne('/api/weather');
    req.flush('fetch failed', { status: 500, statusText: 'Server Error' });

    expect(store.weather()).toBeNull();
    expect(store.loadingWeather()).toBe(false);
    expect(store.error()).toBeTruthy();
  });

  it('resets to the initial state', () => {
    const store = TestBed.inject(WeatherStore);

    store.fetchWeather();
    httpMock.expectOne('/api/weather').flush({ status: 'OK', message: '', data: mockWeather, errors: '' } as ApiResponse<Weather>);

    store.reset();

    expect(store.weather()).toBeNull();
    expect(store.loadingWeather()).toBe(false);
    expect(store.error()).toBeNull();
  });
});
