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

  /**
   * Returns true if the role is authorized to view agents. Otherwise, returns false.
   */
  public canViewAgents(): boolean {
    return this.roleName !== RoleType.None;
  }

  /**
   * Returns true if the role is authorized to view users. Otherwise, returns false.
   */
  public canViewUsers(): boolean {
    return this.roleName === RoleType.SuperAdmin || this.roleName === RoleType.Admin;
  }

  /**
   * Returns true if the role is authorized to view agencies. Otherwise, returns false.
   */
  public canViewAgencies(): boolean {
    return this.roleName === RoleType.SuperAdmin;
  }

  public toPlainObject(): IRole {
    return { ...this };
  }

  public static fromPlainObject(roleObject: IRole): Role {
    return new Role(roleObject);
  }
}
