export interface IMessage {
  error?: string;
  message: string | string[];
  statusCode?: number;
}

export class Message implements IMessage {
  message = '';

  constructor(configOverride: Partial<IMessage>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
