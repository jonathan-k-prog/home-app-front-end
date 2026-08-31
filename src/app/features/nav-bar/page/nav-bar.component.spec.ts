import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { NavBarComponent } from './nav-bar.component';
import { HomeStore } from '../../../core/home/home.store';
import { NotificationStore } from '../../../core/notification/notification.store';
import { Home } from '../../../core/home/home.model';
import { Notification } from '../../../core/notification/notification.model';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  const mockHome: Home = {
    id: 1,
    name: 'Test Home',
    identifier: '00',
    timestamp: 1000,
  };

  let currentSignal: ReturnType<typeof signal<Home | null>>;
  let loadingCurrentSignal: ReturnType<typeof signal<boolean>>;
  let homesSignal: ReturnType<typeof signal<Home[]>>;
  let loadHomesSpy: ReturnType<typeof vi.fn>;

  let notificationsSignal: ReturnType<typeof signal<Notification[]>>;
  let loadNotificationsSpy: ReturnType<typeof vi.fn>;
  let connectSpy: ReturnType<typeof vi.fn>;

  let navigateSpy: ReturnType<typeof vi.fn>;
  let routerMock: { url: string; navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    currentSignal = signal<Home | null>(null);
    loadingCurrentSignal = signal(false);
    homesSignal = signal<Home[]>([]);
    loadHomesSpy = vi.fn();

    notificationsSignal = signal<Notification[]>([]);
    loadNotificationsSpy = vi.fn();
    connectSpy = vi.fn();

    navigateSpy = vi.fn();
    routerMock = { url: '/home-dashboard', navigate: navigateSpy };

    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [
        {
          provide: HomeStore,
          useValue: {
            current: currentSignal,
            loadingCurrent: loadingCurrentSignal,
            homes: homesSignal,
            loadHomes: loadHomesSpy,
          },
        },
        {
          provide: NotificationStore,
          useValue: {
            notifications: notificationsSignal,
            loadNotifications: loadNotificationsSpy,
            connect: connectSpy,
          },
        },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads homes and notifications on init', () => {
    fixture.detectChanges();

    expect(loadHomesSpy).toHaveBeenCalledExactlyOnceWith();
    expect(loadNotificationsSpy).toHaveBeenCalledExactlyOnceWith();
    expect(connectSpy).toHaveBeenCalledExactlyOnceWith();
  });

  it('shows the reduced menu when there is no selected home', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const items = (component as unknown as { items: MenuItem[] }).items;
    expect(items?.map((i) => i.label)).toEqual(['Homes', 'Chat bot', 'Reports']);
  });

  it('shows the full menu once a home is selected', async () => {
    currentSignal.set(mockHome);
    fixture.detectChanges();
    await fixture.whenStable();

    const items = (component as unknown as { items: MenuItem[] }).items;
    expect(items?.map((i) => i.label)).toEqual(['Homes', 'Chat bot', 'Reports', 'Rooms', 'Devices']);
  });

  it('does not update the menu while the current home is loading', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    const before = (component as unknown as { items: MenuItem[] }).items;

    loadingCurrentSignal.set(true);
    currentSignal.set(mockHome);
    fixture.detectChanges();
    await fixture.whenStable();

    const after = (component as unknown as { items: MenuItem[] }).items;
    expect(after).toBe(before);
  });

  it('navigates to the given route', () => {
    (component as unknown as { navigate(route: string): void }).navigate('/weather');

    expect(navigateSpy).toHaveBeenCalledExactlyOnceWith(['/weather']);
  });

  it('reports whether the given route is the currently activated one', () => {
    const navBar = component as unknown as { isRouteActivated(route: string): boolean };

    expect(navBar.isRouteActivated('/home-dashboard')).toBe(true);
    expect(navBar.isRouteActivated('/weather')).toBe(false);
  });
});
