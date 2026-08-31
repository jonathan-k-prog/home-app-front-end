import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarUser } from './user.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { AuthSession } from '../../../../core/auth/auth.model';

describe('NavBarUser', () => {
  let component: NavBarUser;
  let fixture: ComponentFixture<NavBarUser>;

  const mockSession: AuthSession = {
    token: 'token',
    user: { email: 'test@test.com', name: 'Test User', pictureUrl: 'https://example.com/avatar.png' },
  };

  let getSessionSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    getSessionSpy = vi.fn(() => mockSession);

    await TestBed.configureTestingModule({
      imports: [NavBarUser],
      providers: [
        {
          provide: AuthService,
          useValue: { getSession: getSessionSpy },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarUser);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('builds the user menu on init', () => {
    fixture.detectChanges();

    const items = (component as unknown as { userItems: { label: string }[] }).userItems;
    expect(items?.map((i) => i.label)).toEqual(['Profile', 'Settings', 'Log out']);
  });

  it('renders the avatar from the current session', () => {
    fixture.detectChanges();

    const avatar = fixture.nativeElement.querySelector('img');
    expect(avatar?.getAttribute('src')).toBe(mockSession.user.pictureUrl);
  });
});
