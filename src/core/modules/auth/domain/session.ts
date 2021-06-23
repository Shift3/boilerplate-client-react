import { IUser, User } from 'core/modules/user/domain/user';

export interface ISession {
  token: string;
  user: IUser;
}

export class Session implements ISession {
  token = '';
  user = new User();

  constructor(configOverride?: Partial<ISession>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }

  toPlainObject(): ISession {
    return { ...this, user: this.user.toPlainObject() };
  }
}
