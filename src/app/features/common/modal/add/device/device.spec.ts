import { TestBed } from '@angular/core/testing';

import { CommonModalAddDeviceComponent } from './device';

describe('CommonModalAddDeviceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalAddDeviceComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonModalAddDeviceComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
