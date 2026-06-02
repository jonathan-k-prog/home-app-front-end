import { TestBed } from '@angular/core/testing';

import { CommonNavBarComponent } from './nav-bar';

describe('CommonNavBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonNavBarComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CommonNavBarComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
