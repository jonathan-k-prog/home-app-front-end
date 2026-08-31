import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarNotifications } from './notifications.component';
import { NotificationStore } from '../../../../core/notification/notification.store';
import { Notification } from '../../../../core/notification/notification.model';

describe('NavBarNotifications', () => {
  let component: NavBarNotifications;
  let fixture: ComponentFixture<NavBarNotifications>;

  const mockNotification: Notification = {
    id: 1,
    type: 'INFO',
    message: 'Test notification',
    timestamp: 1000,
    read: false,
  };

  let updateNotificationSpy: ReturnType<typeof vi.fn>;
  let deleteNotificationSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    updateNotificationSpy = vi.fn();
    deleteNotificationSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [NavBarNotifications],
      providers: [
        {
          provide: NotificationStore,
          useValue: {
            updateNotification: updateNotificationSpy,
            deleteNotification: deleteNotificationSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarNotifications);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks a read notification as unread', () => {
    (component as unknown as { markNotification(n: Notification): void }).markNotification(mockNotification);

    expect(updateNotificationSpy).toHaveBeenCalledExactlyOnceWith({ ...mockNotification, read: false });
  });

  it('unmarks an unread notification as read', () => {
    (component as unknown as { unmarkNotification(n: Notification): void }).unmarkNotification(mockNotification);

    expect(updateNotificationSpy).toHaveBeenCalledExactlyOnceWith({ ...mockNotification, read: true });
  });

  it('deletes a notification', () => {
    (component as unknown as { deleteNotification(n: Notification): void }).deleteNotification(mockNotification);

    expect(deleteNotificationSpy).toHaveBeenCalledExactlyOnceWith(mockNotification);
  });

  it('maps known notification types to a severity', () => {
    const navBarNotifications = component as unknown as { getSeverity(type: string): string };

    expect(navBarNotifications.getSeverity('success')).toBe('success');
    expect(navBarNotifications.getSeverity('info')).toBe('info');
    expect(navBarNotifications.getSeverity('warn')).toBe('warn');
    expect(navBarNotifications.getSeverity('danger')).toBe('danger');
  });

  it('falls back to info for an unknown type', () => {
    const navBarNotifications = component as unknown as { getSeverity(type: string): string };

    expect(navBarNotifications.getSeverity('unknown')).toBe('info');
  });

  it('filters out read notifications', () => {
    const readNotification = { ...mockNotification, id: 2, read: true };
    const navBarNotifications = component as unknown as { getUnreadNotifications(n: Notification[]): Notification[] };

    expect(navBarNotifications.getUnreadNotifications([mockNotification, readNotification])).toEqual([mockNotification]);
  });

  it('renders without error when there are unread notifications', () => {
    fixture.componentRef.setInput('notifications', [mockNotification]);

    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
