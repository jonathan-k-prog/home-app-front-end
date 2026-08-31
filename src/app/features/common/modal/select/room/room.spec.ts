import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModalSelectRoomComponent } from './room';

describe('CommonModalSelectRoomComponent', () => {
  let component: CommonModalSelectRoomComponent;
  let fixture: ComponentFixture<CommonModalSelectRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalSelectRoomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonModalSelectRoomComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
