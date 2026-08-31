import { AfterViewInit, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApi } from '../../../core/auth/auth.api';
import { AuthService } from '../../../core/auth/auth.service';
import { Config } from '../../../core/config';

declare const google: {
  accounts: {
    id: {
      initialize(options: {
        client_id: string;
        callback: (response: { credential: string }) => void;
      }): void;
      renderButton(
        parent: HTMLElement | null,
        options: { theme: string; size: string; width: number },
      ): void;
    };
  };
};

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthPage implements AfterViewInit {
  protected error = '';
  protected loading = false;

  private authApi = inject(AuthApi);
  private authService = inject(AuthService);
  private config = inject(Config);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngAfterViewInit() {
    this.loadGoogleIdentityScript()
      .then(() => this.renderGoogleButton())
      .catch(() => {
        this.error = 'Impossible de charger Google Sign-In.';
      });
  }

  private renderGoogleButton() {
    if (!this.config.googleClientId) {
      this.error = 'Google client id manquant dans la configuration.';
      return;
    }

    google.accounts.id.initialize({
      client_id: this.config.googleClientId,
      callback: (response) => this.loginWithGoogle(response.credential),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-sign-in-button'),
      {
        theme: 'outline',
        size: 'large',
        width: 280,
      },
    );
  }

  private loadGoogleIdentityScript() {
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  private loginWithGoogle(credential: string) {
    this.loading = true;
    this.error = '';

    this.authApi.loginWithGoogle(credential).subscribe({
      next: (response) => {
        this.authService.setLocal(response.data);
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') || '/weather');
      },
      error: () => {
        this.loading = false;
        this.error = 'Connexion Google refusee.';
      },
    });
  }
}
