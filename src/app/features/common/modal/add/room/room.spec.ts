import { TestBed } from '@angular/core/testing';

import { CommonModalAddRoomComponent } from './room';

describe('CommonModalAddRoomComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalAddRoomComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonModalAddRoomComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
