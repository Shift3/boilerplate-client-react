import { RoleType, User } from 'common/models';

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
  | 'user:delete';

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
    'agent:create': true,
    'user:create': true,
  },
  Admin: {
    'agent:create': true,
    'user:create': true,
  },
  Editor: {},
  User: {},
};

export const getRbacRules = (): RbacRules => rules;
