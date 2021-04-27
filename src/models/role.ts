/* eslint-disable lines-between-class-members */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-classes-per-file */

export type RoleType = 'Admin' | 'Editor' | 'User' | 'Super Administrator' | ''

export interface IRoleDTO {
  id: number
  roleName: RoleType
}

export class RoleDTO implements IRoleDTO {
  id: number = 0
  roleName: RoleType = ''

  constructor(configOverride?: Partial<IRoleDTO>) {
    if (configOverride) {
      Object.assign(this, configOverride)
    }
  }
}
