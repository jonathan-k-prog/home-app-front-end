import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Config } from '../config';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const config = inject(Config);
  const router = inject(Router);

  const isApiRequest = Boolean(config.apiUrl) && req.url.startsWith(config.apiUrl);
  const accessToken = authService.getLocal()?.token;

  const authorizedReq = isApiRequest && accessToken
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authorizedReq).pipe(
    catchError((error: unknown) => {
      if (isApiRequest && error instanceof HttpErrorResponse && error.status === 401) {
        authService.clearLocal();
        router.navigateByUrl(`/auth?returnUrl=${encodeURIComponent(router.url)}`);
      }

      return throwError(() => error);
    }),
  );
};
