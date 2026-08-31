export interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface NotificationRequest {
  type: string;
  message: string;
  timestamp: number;
  read: boolean;
}
