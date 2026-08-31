import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesManagerTitleComponent } from './title.component';

describe('DevicesManagerTitleComponent', () => {
  let component: DevicesManagerTitleComponent;
  let fixture: ComponentFixture<DevicesManagerTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesManagerTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicesManagerTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
