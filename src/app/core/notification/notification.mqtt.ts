import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import mqtt from 'mqtt';
import { Config } from '../config';
import { Notification } from './notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationMqttService {
  private readonly topic = 'home-app-back-end/notification';

  private config = inject(Config);

  listen(): Observable<Notification> {
    return new Observable(observer => {
      const client = mqtt.connect(this.config.mqttUrl);

      client.on('connect', () => {
        client.subscribe(this.topic);
      });

      client.on('message', (_topic, payload) => {
        try {
          const text = new TextDecoder().decode(payload);
          const raw = JSON.parse(text);

          observer.next({
            id: raw.id,
            type: raw.type,
            message: raw.message,
            timestamp: raw.timestamp,
            read: false,
          });
        } catch {}
      });

      client.on('error', err => observer.error(err));

      return () => client.end();
    });
  }
}
