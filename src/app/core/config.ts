import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Config {
  private config: any = {};
  public loaded = false;

  setConfig(config: any) {
    this.config = config;
    this.loaded = true;
  }

  get redirectUri(): string {
    return this.config.redirectUri || '';
  }

  get googleClientId(): string {
    return this.config.googleClientId || '';
  }

  get apiUrl(): string {
    return this.config.apiUrl || '';
  }

  get mqttUrl(): string {
    return this.config.mqttUrl || '';
  }
}
