import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WeatherPage } from './weather.page';
import { WeatherStore } from '../../../core/weather/weather.store';
import { Weather } from '../../../core/weather/weather.model';

describe('WeatherPage', () => {
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

  let fetchWeatherSpy: ReturnType<typeof vi.fn>;
  let weatherSignal: ReturnType<typeof signal<Weather | null>>;
  let loadingWeatherSignal: ReturnType<typeof signal<boolean>>;

  beforeEach(async () => {
    fetchWeatherSpy = vi.fn();
    weatherSignal = signal<Weather | null>(null);
    loadingWeatherSignal = signal(false);

    await TestBed.configureTestingModule({
      imports: [WeatherPage],
      providers: [
        MessageService,
        {
          provide: WeatherStore,
          useValue: {
            weather: weatherSignal,
            loadingWeather: loadingWeatherSignal,
            fetchWeather: fetchWeatherSpy,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(WeatherPage);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('fetches the weather on init', () => {
    const fixture = TestBed.createComponent(WeatherPage);

    fixture.detectChanges();

    expect(fetchWeatherSpy).toHaveBeenCalledTimes(1);
  });

  it('shows a placeholder while there is no weather data', () => {
    const fixture = TestBed.createComponent(WeatherPage);

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No weather data available.');
  });

  it('renders the weather data once the store has it', () => {
    const fixture = TestBed.createComponent(WeatherPage);
    fixture.detectChanges();

    weatherSignal.set(mockWeather);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Sunny');
    expect(fixture.nativeElement.textContent).toContain('21');
  });
});
