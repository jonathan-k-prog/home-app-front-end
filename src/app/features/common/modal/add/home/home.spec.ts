import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModalAddHomeComponent } from './home';

describe('CommonModalAddHomeComponent', () => {
  let component: CommonModalAddHomeComponent;
  let fixture: ComponentFixture<CommonModalAddHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalAddHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonModalAddHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
