import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {providePrimeNG} from 'primeng/config';
import {Config} from './app/core/config';
import {importProvidersFrom, inject, provideAppInitializer} from '@angular/core';
import {provideStore} from '@ngrx/store';
import {EffectsModule, provideEffects} from '@ngrx/effects';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {routes} from './app/app.routes';
import {authInterceptor} from './app/core/auth/auth.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {rootEffects, rootReducers} from './app/app.store';
import Aura from '@primeuix/themes/aura';
import {MessageService} from 'primeng/api';

export function initializeConfig() {
  return async () => {
    const configService = inject(Config);

    try {
      const response = await fetch('/assets/config.json?v=' + Date.now(), { cache: 'no-cache' });
      const config = await response.json();
      configService.setConfig(config);
    } catch (err) {
      console.error('❌ Error loading config.json', err);
    }
  };
}

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    Config,
    provideAppInitializer(initializeConfig()),
    importProvidersFrom(ReactiveFormsModule),
    provideStore(rootReducers),
    provideEffects(...rootEffects),
    importProvidersFrom(EffectsModule),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]), withInterceptorsFromDi()),
    providePrimeNG({
      theme: {
        preset: Aura,
      }
    }),
    MessageService
  ]
})
  .catch((err) => console.error(err));
