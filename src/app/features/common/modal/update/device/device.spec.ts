import { TestBed } from '@angular/core/testing';

import { CommonModalUpdateDeviceComponent } from './device';

describe('CommonModalUpdateDeviceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalUpdateDeviceComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonModalUpdateDeviceComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
