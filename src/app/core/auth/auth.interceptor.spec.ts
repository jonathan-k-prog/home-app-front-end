import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { Config } from '../config';
import { AuthSession } from './auth.model';

describe('authInterceptor', () => {
  let httpTesting: HttpTestingController;
  let authService: { getLocal: ReturnType<typeof vi.fn>; clearLocal: ReturnType<typeof vi.fn> };
  let router: { navigateByUrl: ReturnType<typeof vi.fn>; url: string };

  const session: AuthSession = {
    token: 'app-token',
    user: { email: 'user@example.com', name: 'User Example' },
  };

  beforeEach(() => {
    authService = {
      getLocal: vi.fn(() => session as AuthSession | null),
      clearLocal: vi.fn(),
    };
    router = { navigateByUrl: vi.fn(), url: '/weather' };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: Config, useValue: { apiUrl: 'https://api.example.com' } },
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('attaches the bearer token to requests targeting the api', () => {
    const http = TestBed.inject(HttpClient);

    http.get('https://api.example.com/api/rooms').subscribe();

    const request = httpTesting.expectOne('https://api.example.com/api/rooms');
    expect(request.request.headers.get('Authorization')).toBe('Bearer app-token');
    request.flush({});
  });

  it('does not attach a header when there is no session', () => {
    authService.getLocal.mockReturnValue(null);
    const http = TestBed.inject(HttpClient);

    http.get('https://api.example.com/api/rooms').subscribe();

    const request = httpTesting.expectOne('https://api.example.com/api/rooms');
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });

  it('does not attach a header to requests outside the api', () => {
    const http = TestBed.inject(HttpClient);

    http.get('/assets/config.json').subscribe();

    const request = httpTesting.expectOne('/assets/config.json');
    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });

  it('clears the session and redirects to auth on a 401 from the api', () => {
    const http = TestBed.inject(HttpClient);

    http.get('https://api.example.com/api/rooms').subscribe({ error: () => {} });

    const request = httpTesting.expectOne('https://api.example.com/api/rooms');
    request.flush({ message: 'unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(authService.clearLocal).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth?returnUrl=%2Fweather');
  });

  it('does not clear the session on a 401 from a non-api request', () => {
    const http = TestBed.inject(HttpClient);

    http.get('/assets/config.json').subscribe({ error: () => {} });

    const request = httpTesting.expectOne('/assets/config.json');
    request.flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(authService.clearLocal).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
