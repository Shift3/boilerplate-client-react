import { IRole, Role } from './role';

export interface IUser {
  id: number;
  email: string;
  activatedAt: string | null;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  agency: unknown;
  role: IRole;
}

export class User implements IUser {
  id = 0;
  email = '';
  activatedAt = null;
  firstName = '';
  lastName = '';
  profilePicture = null;
  agency = null;
  role = new Role();

  constructor(configOverride?: Partial<IUser>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }

  public toPlainObject(): IUser {
    return { ...this, role: this.role.toPlainObject() };
  }
}
