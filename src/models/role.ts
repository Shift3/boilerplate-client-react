/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */

export type RoleType = 'Admin' | 'Editor' | 'User' | 'Super Administrator' | '';

export interface IRoleDTO {
  id: number;
  roleName: RoleType;
}

export class RoleDTO implements IRoleDTO {
  id = 0;
  roleName: RoleType = '';

  constructor(configOverride?: Partial<IRoleDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride);
    }
  }
}
