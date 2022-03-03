export type RoleType = 'Super Administrator' | 'Admin' | 'Editor' | 'User' | '';

export const RoleHierarchy: Record<RoleType, number> = {
  'Super Administrator': 4,
  Admin: 3,
  Editor: 2,
  User: 1,
  '': 0,
};

export enum Role {
  USER = 'User',
  EDITOR = 'Editor',
  ADMIN = 'Admin',
  SUPER_ADMIN = 'Super Administrator',
};

export type RoleOption = {
  label: string,
  value: Role
};

