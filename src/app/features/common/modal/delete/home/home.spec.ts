import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModalDeleteHomeComponent } from './home';

describe('CommonModalDeleteHomeComponent', () => {
  let component: CommonModalDeleteHomeComponent;
  let fixture: ComponentFixture<CommonModalDeleteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModalDeleteHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonModalDeleteHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
