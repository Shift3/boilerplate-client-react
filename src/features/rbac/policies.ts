import { RoleType, User } from 'common/models';
import { Permission } from './permissions';

export type Predicate = (user: User, data?: any) => boolean;

export type Rule = boolean | Predicate;

export type PolicySet = {
  [P in Permission]?: Rule;
};

export type RolePolicies = {
  [R in RoleType]?: PolicySet;
};

export const policies: RolePolicies = {
  'Super Administrator': {},
  Admin: {},
  Editor: {},
  User: {},
};
