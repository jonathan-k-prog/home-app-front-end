import { TestBed } from '@angular/core/testing';

import { CommonModalDeleteRoomComponent } from './room';

describe('CommonModalDeleteRoomComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalDeleteRoomComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonModalDeleteRoomComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
