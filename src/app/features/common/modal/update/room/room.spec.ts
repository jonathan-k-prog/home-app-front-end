import { TestBed } from '@angular/core/testing';

import { CommonModalUpdateRoomComponent } from './room';

describe('CommonModalUpdateRoomComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalUpdateRoomComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonModalUpdateRoomComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
