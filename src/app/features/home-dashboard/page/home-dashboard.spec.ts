import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDashboardPage } from './home-dashboard';

describe('HomeDashboardPage', () => {
  let component: HomeDashboardPage;
  let fixture: ComponentFixture<HomeDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
