import { TestBed } from '@angular/core/testing';

import { HomeRoomsCardComponent } from './rooms-card';

describe('HomeRoomsCardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRoomsCardComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeRoomsCardComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
