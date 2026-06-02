import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { RoomsManagerPage } from './rooms-manager';

describe('RoomsManagerPage', () => {
  let component: RoomsManagerPage;
  let fixture: ComponentFixture<RoomsManagerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsManagerPage],
      providers: [provideStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomsManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
