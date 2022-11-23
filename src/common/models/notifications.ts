export interface AppNotification {
  id: number;
  read: Date;
  type: string;
  created: Date;
  data: unknown;
}
