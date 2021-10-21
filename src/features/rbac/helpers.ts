import { User } from 'common/models';
import { Permission } from './permissions';
import { RolePolicies, Rule } from './policies';

export const evaluateRule = (rule: Rule, user: User, data?: any): boolean => {
  if (typeof rule === 'function') {
    return rule(user, data);
  }

  return rule;
};

export const userHasPermission = (policies: RolePolicies, permission: Permission, user: User, data?: any): boolean => {
  const policySet = policies[user.role.roleName];

  if (!policySet) {
    return false;
  }

  const rule = policySet[permission];

  if (!rule) {
    return false;
  }

  return evaluateRule(rule, user, data);
};
