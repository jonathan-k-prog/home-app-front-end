import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            parseUrl: vi.fn((url: string) => ({ redirectTo: url })),
          },
        },
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: vi.fn(),
          },
        },
      ],
    });
  });

  it('allows access when the user is authenticated', () => {
    const authService = TestBed.inject(AuthService);
    vi.mocked(authService.isAuthenticated).mockReturnValue(true);

    const result = executeGuard({} as any, { url: '/weather' } as any);

    expect(result).toBe(true);
  });

  it('redirects to auth with the attempted url when the user is not authenticated', () => {
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);
    vi.mocked(authService.isAuthenticated).mockReturnValue(false);

    const result = executeGuard({} as any, { url: '/weather' } as any);

    expect(router.parseUrl).toHaveBeenCalledWith('/auth?returnUrl=%2Fweather');
    expect(result).toEqual({ redirectTo: '/auth?returnUrl=%2Fweather' });
  });
});
