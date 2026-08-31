import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsManagerTitleComponent } from './title.component';

describe('RoomsManagerTitleComponent', () => {
  let component: RoomsManagerTitleComponent;
  let fixture: ComponentFixture<RoomsManagerTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsManagerTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsManagerTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
