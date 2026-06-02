import { TestBed } from '@angular/core/testing';

import { WeatherPage } from './weather';

describe('WeatherPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherPage],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(WeatherPage);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
