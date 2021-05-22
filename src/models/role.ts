/* eslint-disable lines-between-class-members */

export enum RoleType {
  RuperAdmin = 'Super Admin',
  Admin = 'Admin',
  Editor = 'Editor',
  User = 'User',
  None = '',
}

export interface IRoleDTO {
  id: string;
  roleName: RoleType;
}

export class RoleDTO implements IRoleDTO {
  id = '';
  roleName = RoleType.None;

  constructor(configOverride: Partial<IRoleDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
