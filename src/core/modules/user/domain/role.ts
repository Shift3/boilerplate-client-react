export enum RoleType {
  SuperAdmin = 'Super Administrator',
  Admin = 'Admin',
  Editor = 'Editor',
  User = 'User',
  None = '',
}

export interface IRole {
  id: number;
  roleName: RoleType;
}

export class Role implements IRole {
  id = 0;
  roleName = RoleType.None;

  constructor(configOverride?: Partial<IRole>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }

  public toPlainObject(): IRole {
    return { ...this };
  }
}
