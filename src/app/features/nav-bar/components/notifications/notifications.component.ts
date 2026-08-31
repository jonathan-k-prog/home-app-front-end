import {Component, inject, input, Input} from '@angular/core';
import {Popover} from "primeng/popover";
import {Button, ButtonSeverity} from 'primeng/button';
import {ButtonGroup} from 'primeng/buttongroup';
import {Notification} from '../../../../core/notification/notification.model';
import {NotificationStore} from '../../../../core/notification/notification.store';

@Component({
  selector: 'nav-bar-notifications',
  imports: [
    Popover,
    Button,
    ButtonGroup
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NavBarNotifications {
  public notifications = input<Notification[]>([]);

  private notificationStore = inject(NotificationStore);

  protected markNotification(notification: Notification) {
    this.notificationStore.updateNotification({
      ...notification,
      read: false,
    });
  }


  protected unmarkNotification(notification: Notification) {
    this.notificationStore.updateNotification({
      ...notification,
      read: true,
    });
  }

  protected deleteNotification(notification: Notification) {
    this.notificationStore.deleteNotification(notification);
  }


  protected getSeverity(type: string): ButtonSeverity {
    const map: Record<string, ButtonSeverity> = {
      success: 'success',
      info: 'info',
      warn: 'warn',
      danger: 'danger',
    };
    return map[type] ?? 'info';
  }

  protected getUnreadNotifications(notifications: Notification[]): Notification[] {
    return notifications.filter(tmp => !tmp.read);
  }
}
