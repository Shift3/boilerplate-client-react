export type RoleType = 'Admin' | 'Editor' | 'User' | 'Super Administrator' | '';

export interface IRole {
  id: number;
  roleName: RoleType;
}

export class Role implements IRole {
  id = 0;
  roleName = '' as const;

  constructor(configOverride?: Partial<IRole>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
