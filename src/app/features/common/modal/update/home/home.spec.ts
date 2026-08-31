import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModalUpdateHomeComponent } from './home';

describe('CommonModalUpdateHomeComponent', () => {
  let component: CommonModalUpdateHomeComponent;
  let fixture: ComponentFixture<CommonModalUpdateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalUpdateHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonModalUpdateHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
