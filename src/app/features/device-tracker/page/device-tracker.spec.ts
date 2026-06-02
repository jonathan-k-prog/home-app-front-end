import { TestBed } from '@angular/core/testing';

import { DeviceTrackerPage } from './device-tracker';

describe('DeviceTrackerPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceTrackerPage],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(DeviceTrackerPage);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
