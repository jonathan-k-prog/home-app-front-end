import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthPage } from './auth';
import { AuthApi } from '../../../core/auth/auth.api';
import { Config } from '../../../core/config';

describe('AuthPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPage],
      providers: [
        {
          provide: AuthApi,
          useValue: {
            loginWithGoogle: vi.fn(() => of(null)),
          },
        },
        {
          provide: Config,
          useValue: {
            googleClientId: '',
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: vi.fn(),
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: vi.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(AuthPage);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
