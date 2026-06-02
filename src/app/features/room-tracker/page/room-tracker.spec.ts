import { TestBed } from '@angular/core/testing';

import { RoomTrackerPage } from './room-tracker';

describe('RoomTrackerPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomTrackerPage],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(RoomTrackerPage);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
