import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesManagerTitleComponent } from './title.component';

describe('HomesManagerTitleComponent', () => {
  let component: HomesManagerTitleComponent;
  let fixture: ComponentFixture<HomesManagerTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomesManagerTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomesManagerTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
