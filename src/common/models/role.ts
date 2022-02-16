export type RoleType = 'Super Administrator' | 'Admin' | 'Editor' | 'User' | '';

export const RoleHierarchy: Record<RoleType, number> = {
  'Super Administrator': 4,
  Admin: 3,
  Editor: 2,
  User: 1,
  '': 0,
};

export interface Role {
  id: number;
  roleName: RoleType;
}
