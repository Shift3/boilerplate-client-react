export type RoleType = 'ADMIN' | 'EDITOR' | 'USER' | '';

export const RoleHierarchy: Record<RoleType, number> = {
  ADMIN: 3,
  EDITOR: 2,
  USER: 1,
  '': 0,
};

export enum Role {
  USER = 'USER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}

export type RoleOption = {
  label: string;
  value: Role;
};
