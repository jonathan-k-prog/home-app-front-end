import { TestBed } from '@angular/core/testing';

import { HomePage } from './home';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(HomePage);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
