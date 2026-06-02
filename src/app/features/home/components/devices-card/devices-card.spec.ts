import { TestBed } from '@angular/core/testing';

import { HomeDevicesCardComponent } from './devices-card';

describe('HomeDevicesCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDevicesCardComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeDevicesCardComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
