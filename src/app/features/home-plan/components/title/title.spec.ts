import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Title } from './title';

describe('Title', () => {
  let component: Title;
  let fixture: ComponentFixture<Title>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Title],
    }).compileComponents();

    fixture = TestBed.createComponent(Title);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the page title', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Home Plan');
  });
});
