import { TestBed } from '@angular/core/testing';

import { CommonModalDeleteDeviceComponent } from './device';

describe('CommonModalDeleteDeviceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalDeleteDeviceComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonModalDeleteDeviceComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
