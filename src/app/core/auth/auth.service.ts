import { Injectable } from '@angular/core';
import { AuthSession } from './auth.model';

const AUTH_LOCAL_STORAGE_KEY = 'home-app.auth.local';
const AUTH_SESSION_STORAGE_KEY = 'home-app.auth.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getLocal(): AuthSession | null {
    const rawSession = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as AuthSession;
    } catch {
      localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
      return null;
    }
  }

  setLocal(session: AuthSession) {
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(session));
  }

  clearLocal() {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  }

  isAuthenticated() {
    return Boolean(this.getLocal()?.token);
  }

  getSession(): AuthSession | null {
    const rawSession = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    try {
      return JSON.parse(rawSession) as AuthSession;
    } catch {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
      return null;
    }
  }

  setSession(session: AuthSession) {
    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  clearSession() {
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  }
}
