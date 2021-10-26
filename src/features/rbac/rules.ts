import { Role, RoleHierarchy, RoleType, User } from 'common/models';

export type Permission =
  | 'agency:create'
  | 'agency:read'
  | 'agency:update'
  | 'agency:delete'
  | 'agent:create'
  | 'agent:read'
  | 'agent:update'
  | 'agent:delete'
  | 'role:read'
  | 'user:create'
  | 'user:read'
  | 'user:update'
  | 'user:delete'
  | 'user:change-role'
  | 'user:resend-activation-email'
  | 'user:send-reset-password-email';

export type Predicate = (user: User, data?: unknown) => boolean;

export type Rule = boolean | Predicate;

export type PermissionMap = {
  [P in Permission]?: Rule;
};

export type RbacRules = {
  [R in RoleType]?: PermissionMap;
};

const rules: RbacRules = {
  'Super Administrator': {
    'agency:create': true,
    'agency:read': true,
    'agency:update': true,
    'agency:delete': true,
    'agent:create': true,
    'agent:read': true,
    'agent:update': true,
    'agent:delete': true,
    'role:read': true,
    'user:create': true,
    'user:read': true,
    'user:update': true,
    'user:delete': (self: User, other: unknown) => (other as User).id !== self.id,
    'user:resend-activation-email': true,
    'user:send-reset-password-email': (self: User, other: unknown) => (other as User).id !== self.id,
  },
  Admin: {
    'agent:create': true,
    'agent:read': true,
    'agent:update': true,
    'agent:delete': true,
    'role:read': (user: User, role: unknown) =>
      RoleHierarchy[user.role.roleName] >= RoleHierarchy[(role as Role).roleName],
    'user:create': true,
    'user:read': true,
    'user:update': true,
    'user:delete': (self: User, other: unknown) => (other as User).id !== self.id,
    'user:resend-activation-email': true,
    'user:send-reset-password-email': (self: User, other: unknown) => (other as User).id !== self.id,
  },
  Editor: {
    'agent:read': true,
    'agent:update': true,
  },
  User: {
    'agent:read': true,
  },
};

export const getRbacRules = (): RbacRules => rules;
