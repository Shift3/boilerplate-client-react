export interface HistoricalRecord<T> {
  historyChangeReason: null | string;
  historyDate: string;
  historyId: number;
  historyType: '+' | '-' | '~';
  historyUser: T | null;
}
