import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModalSelectHomeComponent } from './home';

describe('CommonModalSelectHomeComponent', () => {
  let component: CommonModalSelectHomeComponent;
  let fixture: ComponentFixture<CommonModalSelectHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalSelectHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonModalSelectHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
