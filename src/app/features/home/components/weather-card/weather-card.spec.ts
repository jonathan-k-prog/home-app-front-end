import { TestBed } from '@angular/core/testing';

import { HomeWeatherCardComponent } from './weather-card';

describe('HomeWeatherCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWeatherCardComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeWeatherCardComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
