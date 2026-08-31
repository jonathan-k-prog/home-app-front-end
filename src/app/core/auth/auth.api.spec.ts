import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthApi } from './auth.api';
import { Config } from '../config';

describe('AuthApi', () => {
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthApi,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Config,
          useValue: {
            apiUrl: 'https://api.example.com',
          },
        },
      ],
    });

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('posts the Google credential to the backend auth endpoint', () => {
    const api = TestBed.inject(AuthApi);

    api.loginWithGoogle('google-credential').subscribe();

    const request = httpTesting.expectOne('https://api.example.com/api/auth/google');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ idToken: 'google-credential' });
  });
});
