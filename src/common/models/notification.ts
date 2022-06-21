export interface Notification {
  id: number;
  type: string;
  data: unknown;
  read: string | null;
  created: string;
}
