import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthSession } from './auth.model';

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
  });

 it('reports unauthenticated when no session is stored', () => {
    const service = TestBed.inject(AuthService);

    expect(service.isAuthenticated()).toBe(false);
  });

  it('stores a session and reports authenticated', () => {
    const service = TestBed.inject(AuthService);
    const session: AuthSession = {
      token: 'app-token',
      user: {
        email: 'user@example.com',
        name: 'User Example',
        pictureUrl: 'https://example.com/avatar.png',
      },
    };

    service.setLocal(session);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.getLocal()).toEqual(session);
  });
});
