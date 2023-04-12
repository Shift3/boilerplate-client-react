import { Role, RoleType, User } from 'common/models';

export type Permission =
  | 'farm:create'
  | 'farm:read'
  | 'farm:update'
  | 'farm:delete'
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
  [Role.ADMIN]: {
    'farm:create': true,
    'farm:read': true,
    'farm:update': true,
    'farm:delete': true,
    'role:read': true,
    'user:create': true,
    'user:read': true,
    'user:update': true,
    'user:delete': (self: User, other: unknown) => (other as User).id !== self.id,
    'user:resend-activation-email': true,
    'user:send-reset-password-email': (self: User, other: unknown) => (other as User).id !== self.id,
  },
  [Role.EDITOR]: {
    'farm:read': true,
    'farm:update': true,
  },
  [Role.USER]: {
    'farm:read': true,
  },
};

export const getRbacRules = (): RbacRules => rules;
