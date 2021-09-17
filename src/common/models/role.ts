export type RoleType = 'Super Administrator' | 'Admin' | 'Editor' | 'User' | '';

export interface Role {
  id: number;
  roleName: RoleType;
}
