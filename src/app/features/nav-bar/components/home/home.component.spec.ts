import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { NavBarHome } from './home.component';
import { HomeStore } from '../../../../core/home/home.store';
import { Home } from '../../../../core/home/home.model';

describe('NavBarHome', () => {
  let component: NavBarHome;
  let fixture: ComponentFixture<NavBarHome>;

  const mockHome: Home = {
    id: 1,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  let setLocalSpy: ReturnType<typeof vi.fn>;
  let currentSignal: ReturnType<typeof signal<Home | null>>;
  let loadingCurrentSignal: ReturnType<typeof signal<boolean>>;

  beforeEach(async () => {
    setLocalSpy = vi.fn();
    currentSignal = signal<Home | null>(null);
    loadingCurrentSignal = signal(false);

    await TestBed.configureTestingModule({
      imports: [NavBarHome],
      providers: [
        {
          provide: HomeStore,
          useValue: {
            current: currentSignal,
            loadingCurrent: loadingCurrentSignal,
            setLocal: setLocalSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarHome);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selects the current home once it is loaded', async () => {
    currentSignal.set(mockHome);
    fixture.detectChanges();
    await fixture.whenStable();

    expect((component as unknown as { selectedHome: Home | undefined }).selectedHome).toEqual(mockHome);
  });

  it('does not select a home while the current one is still loading', async () => {
    loadingCurrentSignal.set(true);
    currentSignal.set(mockHome);
    fixture.detectChanges();
    await fixture.whenStable();

    expect((component as unknown as { selectedHome: Home | undefined }).selectedHome).toBeUndefined();
  });

  it('forwards the home change to the store', () => {
    component.onHomeChange(mockHome);

    expect(setLocalSpy).toHaveBeenCalledExactlyOnceWith(mockHome);
  });
});
