import { TestBed } from '@angular/core/testing';

import { DevicesManagerPage } from './devices-manager';

describe('DevicesManagerPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesManagerPage],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(DevicesManagerPage);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
