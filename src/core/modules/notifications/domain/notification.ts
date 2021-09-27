export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Delete = 'delete'
}

export interface INotification {
  id: number;
  message: string;
  type: NotificationType;
}

export class Notification implements INotification {
  private static nextId = 0;

  id: number;
  message: string;
  type: NotificationType;

  constructor(message: string, type: NotificationType) {
    this.id = Notification.nextId++;
    this.message = message;
    this.type = type;
  }

  public toPlainObject(): INotification {
    return { ...this };
  }
}
