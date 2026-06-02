import { TestBed } from '@angular/core/testing';

import { CommonModalSelectDeviceComponent } from './device';

describe('CommonModalSelectDeviceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalSelectDeviceComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonModalSelectDeviceComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
